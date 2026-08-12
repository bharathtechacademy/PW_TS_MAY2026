import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

function loadEnv(p) {
  const env = {};
  for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const i = t.indexOf('=');
    if (i < 0) continue;
    env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
  }
  return env;
}

function stripHtml(html) {
  if (!html) return '';
  return String(html)
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<li[^>]*>/gi, '- ')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\r/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

const env = loadEnv(path.join(root, '.env'));
// AZURE_ORG_URL already includes project path, e.g. https://dev.azure.com/{org}/{project}
const orgUrl = env.AZURE_ORG_URL.replace(/\/$/, '').trim();
const project = env.AZURE_PROJECT_NAME.trim();
const pat = env.AZURE_PAT.trim();
const auth = Buffer.from(':' + pat).toString('base64');
const headers = {
  Authorization: 'Basic ' + auth,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

async function api(url, options = {}) {
  const res = await fetch(url, { ...options, headers: { ...headers, ...(options.headers || {}) } });
  const text = await res.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status} ${url}`);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

async function apiPost(url, body) {
  return api(url, { method: 'POST', body: JSON.stringify(body) });
}

async function getMany(ids) {
  if (!ids.length) return [];
  const out = [];
  for (let i = 0; i < ids.length; i += 200) {
    const chunk = ids.slice(i, i + 200);
    const batch = await api(
      `${orgUrl}/_apis/wit/workitems?ids=${chunk.join(',')}&$expand=relations&api-version=7.0`
    );
    out.push(...(batch.value || []));
  }
  return out;
}

const storyIds = [7, 8, 9, 10];
const planId = 1512;
const suiteId = 1514;

// Auth validation via first in-scope work item (org URL already scopes to project)
const stories = [];
for (const id of storyIds) {
  stories.push(await api(`${orgUrl}/_apis/wit/workitems/${id}?$expand=all&api-version=7.0`));
}
console.log(`AUTH_OK project=${project} firstStory=${stories[0].id}:${stories[0].fields['System.Title']}`);

const plan = await api(`${orgUrl}/_apis/testplan/Plans/${planId}?api-version=7.0`);
let suite = { id: suiteId, name: `Suite ${suiteId}`, suiteType: 'Unknown' };
try {
  suite = await api(
    `${orgUrl}/_apis/testplan/Plans/${planId}/Suites/${suiteId}?api-version=7.0`
  );
} catch (e) {
  console.error('suite metadata warn', e.status);
  try {
    suite = await api(
      `${orgUrl}/_apis/test/Plans/${planId}/Suites/${suiteId}?api-version=7.0`
    );
  } catch (e2) {
    console.error('suite fallback warn', e2.status);
  }
}
const pointsResp = await api(
  `${orgUrl}/_apis/test/Plans/${planId}/Suites/${suiteId}/points?api-version=7.0`
);
const pointList = pointsResp.value || [];

let runs = { value: [] };
try {
  runs = await api(`${orgUrl}/_apis/test/runs?api-version=7.0`);
  // Filter to this plan when plan metadata is present on run objects
  runs.value = (runs.value || [])
    .filter((r) => !r.plan || String(r.plan.id) === String(planId))
    .slice(0, 15);
} catch (e) {
  console.error('runs fetch warn', e.status, JSON.stringify(e.body).slice(0, 200));
}

const testedBy = {};
const parentIds = new Set();
const childIds = [];

for (const wi of stories) {
  testedBy[wi.id] = [];
  for (const r of wi.relations || []) {
    const m = (r.url || '').match(/workItems\/(\d+)/i);
    if (!m) continue;
    const rid = Number(m[1]);
    if (r.rel === 'System.LinkTypes.Hierarchy-Reverse') parentIds.add(rid);
    if (r.rel === 'System.LinkTypes.Hierarchy-Forward') childIds.push(rid);
    if (
      r.rel === 'Microsoft.VSTS.Common.TestedBy-Forward' ||
      r.rel === 'Microsoft.VSTS.Common.TestedBy-Reverse'
    ) {
      testedBy[wi.id].push(rid);
    }
  }
}

try {
  const wiqlResult = await apiPost(`${orgUrl}/_apis/wit/wiql?api-version=7.0`, {
    query: `SELECT [System.Id] FROM WorkItemLinks WHERE ([Source].[System.Id] IN (${storyIds.join(',')})) AND ([System.Links.LinkType] = 'Microsoft.VSTS.Common.TestedBy-Forward') MODE (MustContain)`,
  });
  for (const rel of wiqlResult.workItemRelations || []) {
    if (rel.source && rel.target) {
      const sid = rel.source.id;
      const tid = rel.target.id;
      if (!testedBy[sid]) testedBy[sid] = [];
      if (!testedBy[sid].includes(tid)) testedBy[sid].push(tid);
    }
  }
} catch (e) {
  console.error('WIQL testedBy warn', e.status, JSON.stringify(e.body).slice(0, 300));
}

const parents = [];
for (const pid of parentIds) {
  try {
    parents.push(await api(`${orgUrl}/_apis/wit/workitems/${pid}?api-version=7.0`));
  } catch {}
}

const tcIds = [
  ...new Set(
    pointList
      .map((p) => (p.testCase && (p.testCase.id || p.testCase)) || null)
      .filter(Boolean)
      .map(Number)
  ),
];
const testCases = await getMany(tcIds);
const children = await getMany([...new Set(childIds)]);
const childBugs = children.filter((c) => (c.fields['System.WorkItemType'] || '') === 'Bug');

const knownBugIds = [1516, 1519, 1520];
let relatedBugs = [];
try {
  const br = await apiPost(`${orgUrl}/_apis/wit/wiql?api-version=7.0`, {
    query: `SELECT [System.Id] FROM WorkItems WHERE [System.WorkItemType] = 'Bug' AND [System.Id] IN (${knownBugIds.join(',')})`,
  });
  relatedBugs = await getMany((br.workItems || []).map((w) => w.id));
} catch {
  relatedBugs = await getMany(knownBugIds);
}

const out = {
  auth: { project, orgUrl },
  email: env.AZURE_EMAIL,
  stories: stories.map((wi) => ({
    id: wi.id,
    type: wi.fields['System.WorkItemType'],
    title: wi.fields['System.Title'],
    state: wi.fields['System.State'],
    assignedTo:
      (wi.fields['System.AssignedTo'] && wi.fields['System.AssignedTo'].displayName) ||
      'Unassigned',
    area: wi.fields['System.AreaPath'],
    iteration: wi.fields['System.IterationPath'],
    priority: wi.fields['Microsoft.VSTS.Common.Priority'],
    tags: wi.fields['System.Tags'] || '',
    description: stripHtml(wi.fields['System.Description']),
    acceptanceCriteria: stripHtml(wi.fields['Microsoft.VSTS.Common.AcceptanceCriteria']),
    relations: (wi.relations || []).map((r) => ({
      rel: r.rel,
      url: r.url,
      name: r.attributes && r.attributes.name,
    })),
    testedBy: testedBy[wi.id] || [],
  })),
  parents: parents.map((wi) => ({
    id: wi.id,
    type: wi.fields['System.WorkItemType'],
    title: wi.fields['System.Title'],
    state: wi.fields['System.State'],
  })),
  plan: {
    id: plan.id,
    name: plan.name,
    state: plan.state,
    areaPath: plan.areaPath,
    iteration: plan.iteration,
  },
  suite: {
    id: suite.id,
    name: suite.name,
    suiteType: suite.suiteType,
  },
  points: pointList.map((p) => ({
    id: p.id,
    testCaseId: p.testCase && p.testCase.id,
    testCaseName: p.testCase && p.testCase.name,
    outcome: p.outcome || 'None',
    lastResultState: p.lastResultState,
    lastResultDetails: p.lastResultDetails,
    assignedTo: p.assignedTo && (p.assignedTo.displayName || p.assignedTo),
  })),
  testCases: testCases.map((tc) => ({
    id: tc.id,
    title: tc.fields['System.Title'],
    state: tc.fields['System.State'],
    relations: (tc.relations || []).map((r) => ({ rel: r.rel, url: r.url })),
  })),
  runs: (runs.value || []).map((r) => ({
    id: r.id,
    name: r.name,
    state: r.state,
    totalTests: r.totalTests,
    passedTests: r.passedTests,
    incompleteTests: r.incompleteTests,
    notApplicableTests: r.notApplicableTests,
    unanalyzedTests: r.unanalyzedTests,
    completedDate: r.completedDate,
    startedDate: r.startedDate,
  })),
  bugs: [...relatedBugs, ...childBugs].map((b) => ({
    id: b.id,
    title: b.fields['System.Title'],
    state: b.fields['System.State'],
    severity: b.fields['Microsoft.VSTS.Common.Severity'],
    priority: b.fields['Microsoft.VSTS.Common.Priority'],
    type: b.fields['System.WorkItemType'],
  })),
  children: children.map((c) => ({
    id: c.id,
    type: c.fields['System.WorkItemType'],
    title: c.fields['System.Title'],
    state: c.fields['System.State'],
  })),
};

const outPath = path.join(root, 'ai-generated', '_release_notes_source_1512.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log('WROTE', outPath);
console.log(
  'stories',
  out.stories.map((s) => `${s.id}:${s.state}:${s.title}`).join(' | ')
);
console.log(
  'parents',
  out.parents.map((p) => `${p.id}:${p.type}:${p.title}`).join(' | ') || 'none'
);
console.log('points', out.points.length);
console.log(
  'outcomes',
  JSON.stringify(
    out.points.reduce((a, p) => {
      a[p.outcome] = (a[p.outcome] || 0) + 1;
      return a;
    }, {})
  )
);
console.log(
  'bugs',
  out.bugs.map((b) => `${b.id}:${b.state}`).join(',')
);
console.log(
  'runs',
  out.runs
    .slice(0, 5)
    .map((r) => `${r.id}:${r.state}:pass${r.passedTests}/${r.totalTests}`)
    .join(',')
);
console.log('testedBy', JSON.stringify(testedBy));
