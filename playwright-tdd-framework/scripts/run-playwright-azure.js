import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);

function getArgValue(name) {
  const match = args.find((value) => value.startsWith(`--${name}=`));
  return match ? match.split('=').slice(1).join('=') : undefined;
}

const planId = getArgValue('planId') || process.env.AZURE_TEST_PLAN_ID || '80';
const suiteId = getArgValue('suiteId') || process.env.AZURE_TEST_SUITE_ID || '80';
const suiteName = getArgValue('suite') || process.env.TEST_SUITE || 'ui';
const azureSuiteName = getArgValue('azureSuiteName') || process.env.AZURE_TEST_SUITE_NAME || 'Creatio CRM UI Tests';
const filePath = `tests/${suiteName}/${suiteName}-tests.spec.ts`;

process.env.AZURE_TEST_PLAN_ID = planId;
process.env.AZURE_TEST_SUITE_ID = suiteId;
process.env.AZURE_TEST_SUITE_NAME = azureSuiteName;
process.env.TEST_SUITE = suiteName;

console.log(`Running Playwright suite: ${suiteName}`);
console.log(`Azure Test Plan ID: ${planId}`);
console.log(`Azure Test Suite ID: ${suiteId}`);
console.log(`Azure Test Suite Name: ${azureSuiteName}`);

const cliPath = require.resolve('@playwright/test/cli');
const child = spawnSync(
  process.execPath,
  [cliPath, 'test', filePath, '--project=chromium', '--headed', '--', '--planId=' + planId, '--suiteId=' + suiteId],
  { stdio: 'inherit', shell: false }
);

if (child.error) {
  console.error(child.error);
  process.exit(1);
}

process.exit(child.status ?? 0);
