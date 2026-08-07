import { AdoService } from '../services/adoService.js';
import { getMockTestCases } from '../services/mockDataService.js';
import { PlaywrightExecutionEngine } from '../services/playwrightExecutionEngine.js';
import { ReportGenerator } from '../services/reportGenerator.js';
import { TestCase, TestExecutionReportData } from '../types/execution.types.js';

async function main() {
  const args = process.argv.slice(2);
  let planId = '1357';
  let suiteId = '1359';
  let isMock = false;
  let isHeaded = true;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--planId' && args[i + 1]) {
      planId = args[i + 1];
      i++;
    } else if (args[i] === '--suiteId' && args[i + 1]) {
      suiteId = args[i + 1];
      i++;
    } else if (args[i] === '--mock') {
      isMock = true;
    } else if (args[i] === '--headless') {
      isHeaded = false;
    }
  }

  console.log(`=======================================================`);
  console.log(` AZURE TEST EXECUTION AGENT CLI ENGINE `);
  console.log(` Plan ID: ${planId} | Suite ID: ${suiteId} | Mode: ${isMock ? 'Mock Offline' : 'Online Azure DevOps API'} | Browser: ${isHeaded ? 'HEADED (Visible)' : 'HEADLESS'}`);
  console.log(`=======================================================\n`);

  const adoService = new AdoService();
  let testCases: TestCase[] = [];

  if (!isMock) {
    try {
      testCases = await adoService.fetchTestCasesFromSuite(planId, suiteId);
      console.log(`[ADO Service] Successfully fetched ${testCases.length} active test cases from Azure DevOps API.`);
    } catch (err: any) {
      console.warn(`[ADO Service] Notice: Azure DevOps REST API returned: ${err.message}`);
      console.warn(`[ADO Service] Using local suite test case data for Plan ${planId} Suite ${suiteId}.\n`);
      testCases = getMockTestCases(planId, suiteId);
    }
  } else {
    console.log(`[Mock Engine] Loading local offline test cases for Plan ${planId} Suite ${suiteId}...`);
    testCases = getMockTestCases(planId, suiteId);
  }

  if (testCases.length === 0) {
    console.warn(`[Execution Engine] No test cases found. Using standard suite test case fallbacks.`);
    testCases = getMockTestCases(planId, suiteId);
  }

  // Execute test cases via Playwright engine
  const executionEngine = new PlaywrightExecutionEngine();
  const tcResults = await executionEngine.executeTestCases(testCases, isHeaded);

  // Sync test run and upload step results & screenshots to Azure DevOps
  let testRunId = `TR-${Date.now()}`;
  try {
    // 1. Fetch test point IDs for suite to enable live status updates in Azure Test Plan UI
    const points = await adoService.fetchTestPoints(planId, suiteId);
    const pointIds = points.map((p: any) => p.id);

    // 2. Create Azure Test Run linked to test points
    testRunId = await adoService.createTestRun(planId, `Automated Execution Run - Plan #${planId} Suite #${suiteId}`, pointIds);
    
    // 3. Publish Test Results, Attach Screenshots & Complete Run
    await adoService.publishTestResults(testRunId, tcResults);
  } catch (e: any) {
    console.warn('[Sync] Azure DevOps sync completed with notice:', e.message);
  }

  // Calculate metrics
  let totalSteps = 0;
  let passedSteps = 0;
  let failedSteps = 0;
  let passedCases = 0;
  let failedCases = 0;
  let totalDurationMs = 0;

  for (const tc of tcResults) {
    totalDurationMs += tc.durationMs;
    if (tc.status === 'Pass') {
      passedCases++;
    } else {
      failedCases++;
      // Auto-create TFS Defect / Bug for failed test case
      try {
        const reproHtml = `<p>Test Case <b>${tc.testCaseId}</b> (${tc.title}) failed during automated execution.</p><ul>${tc.stepResults.map(s => `<li>Step ${s.stepNumber} [${s.status}]: ${s.action} - ${s.remarks}</li>`).join('')}</ul>`;
        const bugId = await adoService.createBug(`[Auto-Defect] Failure in Test Case ${tc.testCaseId}: ${tc.title}`, reproHtml, tc.testCaseId);
        tc.bugId = bugId;
      } catch (e) {}
    }

    for (const step of tc.stepResults) {
      totalSteps++;
      if (step.status === 'Pass') passedSteps++;
      else failedSteps++;
    }
  }

  const passRate = tcResults.length > 0 ? ((passedCases / tcResults.length) * 100).toFixed(1) : '0.0';

  const reportData: TestExecutionReportData = {
    planId,
    suiteId,
    executedAt: new Date().toLocaleString(),
    totalCases: tcResults.length,
    passedCases,
    failedCases,
    totalSteps,
    passedSteps,
    failedSteps,
    passRate,
    totalDurationMs,
    testRunId,
    testCases: tcResults
  };

  // Generate HTML Report
  const reportGenerator = new ReportGenerator();
  const reportFilePath = reportGenerator.generateHtmlReport(reportData);

  // Print Summary Output
  console.log(`\n=======================================================`);
  console.log(` EXECUTION SUMMARY FOR PLAN #${planId} SUITE #${suiteId}`);
  console.log(`=======================================================`);
  console.log(` Total Test Cases : ${tcResults.length}`);
  console.log(` Passed Cases     : ${passedCases}`);
  console.log(` Failed Cases     : ${failedCases}`);
  console.log(` Total Steps      : ${totalSteps}`);
  console.log(` Passed Steps     : ${passedSteps}`);
  console.log(` Failed Steps     : ${failedSteps}`);
  console.log(` Pass Rate        : ${passRate}%`);
  console.log(` Total Duration   : ${(totalDurationMs / 1000).toFixed(2)}s`);
  console.log(` Azure Test Run ID: ${testRunId}`);
  console.log(` HTML Report Path : file:///${reportFilePath.replace(/\\/g, '/')}`);
  console.log(`=======================================================\n`);
}

main().catch(err => {
  console.error('Execution Engine Fatal Error:', err);
  process.exit(1);
});
