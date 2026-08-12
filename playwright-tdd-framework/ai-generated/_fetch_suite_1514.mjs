import fs from 'fs';
import path from 'path';

const envPath = path.resolve('.env');
const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
const env = {};
for (const line of lines) {
  const t = line.trim();
  if (!t || t.startsWith('#')) continue;
  const i = t.indexOf('=');
  if (i === -1) continue;
  env[t.slice(0, i).trim()] = t.slice(i + 1).trim();
}

const orgUrl = env.AZURE_ORG_URL;
const auth = 'Basic ' + Buffer.from(':' + env.AZURE_PAT).toString('base64');

function decodeHtml(s) {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseStepsXml(stepsXml) {
  const steps = [];
  if (!stepsXml) return steps;
  const stepRegex = /<step id="(\d+)" type="(\w+)">([\s\S]*?)<\/step>/g;
  let match;
  let stepNum = 1;
  while ((match = stepRegex.exec(stepsXml)) !== null) {
    const content = match[3];
    const stringMatches = content.match(/<parameterizedString[^>]*>([\s\S]*?)<\/parameterizedString>/g) || [];
    const action = stringMatches[0] ? decodeHtml(stringMatches[0].replace(/<\/?parameterizedString[^>]*>/g, '')) : `Step ${stepNum}`;
    const expected = stringMatches[1] ? decodeHtml(stringMatches[1].replace(/<\/?parameterizedString[^>]*>/g, '')) : '';
    steps.push({ stepId: match[1], stepNumber: stepNum++, action, expectedResult: expected });
  }
  return steps;
}

const listUrl = `${orgUrl}/_apis/test/Plans/1512/Suites/1514/testcases?api-version=7.0`;
const listRes = await fetch(listUrl, { headers: { Authorization: auth, Accept: 'application/json' } });
if (!listRes.ok) {
  console.error('LIST_FAIL', listRes.status, await listRes.text());
  process.exit(1);
}
const listJson = await listRes.json();
const ids = (listJson.value || []).map((e) => e.testCase?.id).filter(Boolean);
console.log('IDS=' + ids.join(','));

const testCases = [];
for (const id of ids) {
  const wiUrl = `${orgUrl}/_apis/wit/workitems/${id}?$expand=all&api-version=7.0`;
  const wiRes = await fetch(wiUrl, { headers: { Authorization: auth } });
  if (!wiRes.ok) {
    console.error('WI_FAIL', id, wiRes.status);
    continue;
  }
  const wi = await wiRes.json();
  const title = wi.fields?.['System.Title'] || `Test Case ${id}`;
  const stepsXml = wi.fields?.['Microsoft.VSTS.TCM.Steps'] || '';
  const steps = parseStepsXml(stepsXml);
  testCases.push({
    id: String(id),
    title,
    steps,
    state: wi.fields?.['System.State'],
    assignedTo: wi.fields?.['System.AssignedTo']?.displayName || env.AZURE_EMAIL,
    areaPath: wi.fields?.['System.AreaPath'] || env.AZURE_PROJECT_NAME
  });
  console.log(`TC ${id} | ${title} | steps=${steps.length}`);
  for (const s of steps) {
    console.log(`  ${s.stepNumber}. ${s.action}`);
    console.log(`     => ${s.expectedResult}`);
  }
}

fs.mkdirSync('ai-generated', { recursive: true });
fs.writeFileSync('ai-generated/_suite_1514_parsed.json', JSON.stringify(testCases, null, 2));
console.log('TOTAL=' + testCases.length);
