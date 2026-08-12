param(
  [string]$StoryKey = '',
  [ValidateSet('apply', 'dry-run')]
  [string]$RunMode = 'apply'
)

$workspaceRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $workspaceRoot
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Net.Http

$storyKey = $StoryKey
$commentsPath = 'ai-generated\export-jira\comments.txt'
$filesDir = 'ai-generated\export-jira\files'
$statePath = 'ai-generated\export-jira\.jira-sync-state.json'
$envPath = '.env'

function Read-DotEnv([string]$path) {
  $map = @{}
  if (-not (Test-Path $path)) { return $map }
  foreach ($line in Get-Content -Path $path -Encoding UTF8) {
    $t = $line.Trim()
    if ($t -eq '' -or $t.StartsWith('#')) { continue }
    $idx = $t.IndexOf('=')
    if ($idx -lt 1) { continue }
    $k = $t.Substring(0, $idx).Trim()
    $v = $t.Substring($idx + 1).Trim()
    if (($v.StartsWith('"') -and $v.EndsWith('"')) -or ($v.StartsWith("'") -and $v.EndsWith("'"))) {
      if ($v.Length -ge 2) { $v = $v.Substring(1, $v.Length - 2) }
    }
    $map[$k] = $v
  }
  return $map
}

function Normalize-Comment([string]$text) {
  $lines = $text -split "`r?`n"
  $trimmed = @()
  foreach ($l in $lines) { $trimmed += $l.TrimEnd() }
  return ($trimmed -join "`n").Trim()
}

function Get-Sha256([string]$text) {
  $sha = [System.Security.Cryptography.SHA256]::Create()
  try {
    $bytes = [System.Text.Encoding]::UTF8.GetBytes($text)
    $hash = $sha.ComputeHash($bytes)
    return ([BitConverter]::ToString($hash)).Replace('-', '').ToLowerInvariant()
  }
  finally { $sha.Dispose() }
}

function Get-RelativePath([string]$basePath, [string]$targetPath) {
  $baseFull = (Resolve-Path $basePath).Path
  if (-not $baseFull.EndsWith([IO.Path]::DirectorySeparatorChar)) {
    $baseFull = $baseFull + [IO.Path]::DirectorySeparatorChar
  }
  $baseUri = New-Object System.Uri($baseFull)
  $targetUri = New-Object System.Uri((Resolve-Path $targetPath).Path)
  $relativeUri = $baseUri.MakeRelativeUri($targetUri)
  return [System.Uri]::UnescapeDataString($relativeUri.ToString().Replace('/', [IO.Path]::DirectorySeparatorChar))
}

function Ensure-State([string]$path) {
  $initial = [PSCustomObject]@{ version = 1; stories = [PSCustomObject]@{} }
  if (-not (Test-Path $path)) {
    $initial | ConvertTo-Json -Depth 10 | Set-Content -Path $path -Encoding UTF8
    return $initial
  }
  try {
    $raw = Get-Content -Path $path -Raw -Encoding UTF8
    if ([string]::IsNullOrWhiteSpace($raw)) {
      $initial | ConvertTo-Json -Depth 10 | Set-Content -Path $path -Encoding UTF8
      return $initial
    }
    $obj = $raw | ConvertFrom-Json
    if ($null -eq $obj.stories) { throw 'Invalid state schema' }
    return $obj
  }
  catch {
    $backup = "$path.bak.$([DateTime]::UtcNow.ToString('yyyyMMddHHmmss'))"
    Copy-Item -Path $path -Destination $backup -Force
    $initial | ConvertTo-Json -Depth 10 | Set-Content -Path $path -Encoding UTF8
    return $initial
  }
}

function Ensure-StoryState($stateObj, [string]$key) {
  $story = $stateObj.stories.PSObject.Properties[$key]
  if ($null -eq $story) {
    $stateObj.stories | Add-Member -NotePropertyName $key -NotePropertyValue ([PSCustomObject]@{
      commentHashes = @()
      attachmentFingerprints = @()
      updatedAtUtc = [DateTime]::UtcNow.ToString('o')
    })
  }

  if ($null -eq $stateObj.stories.$key.commentHashes) {
    $stateObj.stories.$key | Add-Member -NotePropertyName commentHashes -NotePropertyValue @()
  }
  if ($null -eq $stateObj.stories.$key.attachmentFingerprints) {
    $stateObj.stories.$key | Add-Member -NotePropertyName attachmentFingerprints -NotePropertyValue @()
  }
}

$envMap = Read-DotEnv $envPath
$baseUrl = ''
if ($envMap.ContainsKey('JIRA_BASE_URL')) {
  $baseUrl = $envMap['JIRA_BASE_URL'].Trim().TrimEnd('/')
}
$email = if ($envMap.ContainsKey('JIRA_EMAIL')) { $envMap['JIRA_EMAIL'] } else { '' }
$token = if ($envMap.ContainsKey('JIRA_API_TOKEN')) { $envMap['JIRA_API_TOKEN'] } else { '' }
if ([string]::IsNullOrWhiteSpace($storyKey) -and $envMap.ContainsKey('JIRA_DEFAULT_STORY_KEY')) {
  $storyKey = $envMap['JIRA_DEFAULT_STORY_KEY']
}

if ([string]::IsNullOrWhiteSpace($storyKey)) { throw 'Missing Jira story key.' }
if ([string]::IsNullOrWhiteSpace($baseUrl) -or [string]::IsNullOrWhiteSpace($email) -or [string]::IsNullOrWhiteSpace($token)) {
  throw 'Missing Jira configuration in .env (JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN).'
}

$authBytes = [System.Text.Encoding]::ASCII.GetBytes("$email`:$token")
$auth = [Convert]::ToBase64String($authBytes)
$client = New-Object System.Net.Http.HttpClient
$client.DefaultRequestHeaders.Authorization = New-Object System.Net.Http.Headers.AuthenticationHeaderValue('Basic', $auth)
$client.DefaultRequestHeaders.Accept.Add((New-Object System.Net.Http.Headers.MediaTypeWithQualityHeaderValue('application/json')))

$ops = New-Object System.Collections.Generic.List[object]

try {
  $issueUrl = "$baseUrl/rest/api/2/issue/${storyKey}?fields=key"
  $issueResp = $client.GetAsync($issueUrl).Result
  if (-not $issueResp.IsSuccessStatusCode) {
    throw "Issue validation failed: HTTP $([int]$issueResp.StatusCode)"
  }

  $commentBlocks = @()
  if (Test-Path $commentsPath) {
    $rawComments = Get-Content -Path $commentsPath -Raw -Encoding UTF8
    if (-not [string]::IsNullOrWhiteSpace($rawComments)) {
      $parts = [regex]::Split($rawComments.Trim(), "`r?`n\s*`r?`n+")
      foreach ($part in $parts) {
        $lines = $part -split "`r?`n"
        $kept = @()
        foreach ($ln in $lines) {
          if ($ln -match '^(?i)\s*##ignore') { continue }
          $kept += $ln
        }
        $block = ($kept -join "`n").Trim()
        if (-not [string]::IsNullOrWhiteSpace($block)) { $commentBlocks += $block }
      }
    }
  }

  $files = @()
  if (Test-Path $filesDir) {
    $files = @(Get-ChildItem -Path $filesDir -Recurse -File -ErrorAction SilentlyContinue)
  }

  $state = Ensure-State $statePath
  Ensure-StoryState $state $storyKey

  $existingCommentHashes = @{}
  foreach ($h in @($state.stories.$storyKey.commentHashes)) {
    if (-not [string]::IsNullOrWhiteSpace([string]$h)) { $existingCommentHashes[[string]$h] = $true }
  }
  $existingFileFps = @{}
  foreach ($f in @($state.stories.$storyKey.attachmentFingerprints)) {
    if (-not [string]::IsNullOrWhiteSpace([string]$f)) { $existingFileFps[[string]$f] = $true }
  }

  $pendingComments = New-Object System.Collections.Generic.List[object]
  foreach ($c in $commentBlocks) {
    $norm = Normalize-Comment $c
    if ([string]::IsNullOrWhiteSpace($norm)) { continue }
    $hash = Get-Sha256 $norm
    if ($existingCommentHashes.ContainsKey($hash)) {
      $ops.Add([PSCustomObject]@{ type='comment'; id=$hash.Substring(0,12); action='skipped'; reason='duplicate-hash' }) | Out-Null
      continue
    }
    $pendingComments.Add([PSCustomObject]@{ text=$norm; hash=$hash }) | Out-Null
  }

  $pendingFiles = New-Object System.Collections.Generic.List[object]
  foreach ($file in $files) {
    $relative = Get-RelativePath $filesDir $file.FullName
    $fp = "$relative|$($file.Length)|$($file.LastWriteTimeUtc.Ticks)"
    if ($existingFileFps.ContainsKey($fp)) {
      $ops.Add([PSCustomObject]@{ type='file'; id=$relative; action='skipped'; reason='duplicate-fingerprint' }) | Out-Null
      continue
    }
    $pendingFiles.Add([PSCustomObject]@{ file=$file; relative=$relative; fingerprint=$fp }) | Out-Null
  }

  if ($RunMode -eq 'dry-run') {
    foreach ($pc in $pendingComments) {
      $ops.Add([PSCustomObject]@{ type='comment'; id=$pc.hash.Substring(0,12); action='pending'; reason='dry-run' }) | Out-Null
    }
    foreach ($pf in $pendingFiles) {
      $ops.Add([PSCustomObject]@{ type='file'; id=$pf.relative; action='pending'; reason='dry-run' }) | Out-Null
    }

    $pendingCommentsCount = $pendingComments.Count
    $pendingFilesCount = $pendingFiles.Count
    $skipped = @($ops | Where-Object { $_.action -eq 'skipped' }).Count

    "Mode: dry-run"
    "Story: $storyKey"
    "Pending comments: $pendingCommentsCount"
    "Pending files: $pendingFilesCount"
    "Skipped duplicates: $skipped"
    "Failures: 0"
    "State file: $statePath"
    "No Jira changes were made."
    ""
    "Operations:"
    $ops | ForEach-Object { "[$($_.type)] $($_.id) => $($_.action) ($($_.reason))" }
    return
  }

  foreach ($pc in $pendingComments) {
    $ok = $false
    $lastCode = ''
    for ($attempt = 1; $attempt -le 3 -and -not $ok; $attempt++) {
      $payload = @{ body = $pc.text } | ConvertTo-Json -Depth 5
      $content = New-Object System.Net.Http.StringContent($payload, [System.Text.Encoding]::UTF8, 'application/json')
      try {
        $resp = $client.PostAsync("$baseUrl/rest/api/2/issue/$storyKey/comment", $content).Result
        $lastCode = [int]$resp.StatusCode
        if ($resp.IsSuccessStatusCode) {
          $ok = $true
          break
        }
      }
      finally {
        $content.Dispose()
      }
    }

    if ($ok) {
      $state.stories.$storyKey.commentHashes += $pc.hash
      $ops.Add([PSCustomObject]@{ type='comment'; id=$pc.hash.Substring(0,12); action='posted'; reason='ok' }) | Out-Null
    }
    else {
      $ops.Add([PSCustomObject]@{ type='comment'; id=$pc.hash.Substring(0,12); action='failed'; reason="http-$lastCode" }) | Out-Null
    }
  }

  foreach ($pf in $pendingFiles) {
    $ok = $false
    $lastCode = ''

    for ($attempt = 1; $attempt -le 3 -and -not $ok; $attempt++) {
      $stream = [System.IO.File]::OpenRead($pf.file.FullName)
      $fileContent = New-Object System.Net.Http.StreamContent($stream)
      $multi = New-Object System.Net.Http.MultipartFormDataContent
      $req = New-Object System.Net.Http.HttpRequestMessage([System.Net.Http.HttpMethod]::Post, "$baseUrl/rest/api/2/issue/$storyKey/attachments")

      try {
        $fileContent.Headers.ContentType = [System.Net.Http.Headers.MediaTypeHeaderValue]::Parse('application/octet-stream')
        $multi.Add($fileContent, 'file', $pf.file.Name)
        $req.Headers.Add('X-Atlassian-Token', 'no-check')
        $req.Content = $multi

        $resp = $client.SendAsync($req).Result
        $lastCode = [int]$resp.StatusCode
        if ($resp.IsSuccessStatusCode) {
          $ok = $true
          break
        }
      }
      finally {
        $req.Dispose()
        $multi.Dispose()
        $fileContent.Dispose()
        $stream.Dispose()
      }
    }

    if ($ok) {
      $state.stories.$storyKey.attachmentFingerprints += $pf.fingerprint
      $ops.Add([PSCustomObject]@{ type='file'; id=$pf.relative; action='uploaded'; reason='ok' }) | Out-Null
    }
    else {
      $ops.Add([PSCustomObject]@{ type='file'; id=$pf.relative; action='failed'; reason="http-$lastCode" }) | Out-Null
    }
  }

  $state.stories.$storyKey.updatedAtUtc = [DateTime]::UtcNow.ToString('o')
  $state | ConvertTo-Json -Depth 20 | Set-Content -Path $statePath -Encoding UTF8

  $postedComments = @($ops | Where-Object { $_.type -eq 'comment' -and $_.action -eq 'posted' }).Count
  $uploadedFiles = @($ops | Where-Object { $_.type -eq 'file' -and $_.action -eq 'uploaded' }).Count
  $skipped = @($ops | Where-Object { $_.action -eq 'skipped' }).Count
  $failed = @($ops | Where-Object { $_.action -eq 'failed' }).Count

  "Mode: apply"
  "Story: $storyKey"
  "Posted comments: $postedComments"
  "Uploaded files: $uploadedFiles"
  "Skipped duplicates: $skipped"
  "Failures: $failed"
  "State file: $statePath"
  ""
  "Operations:"
  $ops | ForEach-Object { "[$($_.type)] $($_.id) => $($_.action) ($($_.reason))" }
}
finally {
  $client.Dispose()
}
