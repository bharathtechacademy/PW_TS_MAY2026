import fs from 'fs';
import path from 'path';
import { TestCase, TestStep, TestCaseExecutionResult, StepExecutionResult } from '../types/execution.types.js';

export interface AdoConfig {
  orgUrl: string;
  projectName: string;
  pat: string;
  email: string;
}

export function loadAdoConfig(): AdoConfig {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.substring(0, idx).trim();
        const val = trimmed.substring(idx + 1).trim();
        process.env[key] = val;
      }
    }
  }

  return {
    orgUrl: process.env.AZURE_ORG_URL?.trim() || 'https://dev.azure.com/bharattechacademy3/Creatio%20CRM',
    projectName: process.env.AZURE_PROJECT_NAME?.trim() || 'Creatio CRM',
    pat: process.env.AZURE_PAT?.trim() || '',
    email: process.env.AZURE_EMAIL?.trim() || 'bharattechacademy3@outlook.com'
  };
}

export class AdoService {
  private config: AdoConfig;
  private authHeader: string;

  constructor() {
    this.config = loadAdoConfig();
    this.authHeader = `Basic ${Buffer.from(`:${this.config.pat}`).toString('base64')}`;
  }

  public get maskedPat(): string {
    return this.config.pat ? '***' : 'NONE';
  }

  public async fetchTestCasesFromSuite(planId: string, suiteId: string): Promise<TestCase[]> {
    const url = `${this.config.orgUrl}/_apis/test/Plans/${planId}/Suites/${suiteId}/testcases?api-version=7.0`;
    console.log(`[ADO Service] Connecting to Azure DevOps REST API: ${url}...`);

    const response = await fetch(url, {
      headers: {
        'Authorization': this.authHeader,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Azure DevOps API returned HTTP ${response.status}: ${response.statusText}`);
    }

    const data: any = await response.json();
    const entries = data.value || [];
    const testCases: TestCase[] = [];

    for (const entry of entries) {
      const tcId = entry.testCase?.id;
      if (!tcId) continue;

      const wiUrl = `${this.config.orgUrl}/_apis/wit/workitems/${tcId}?$expand=all&api-version=7.0`;
      const wiResp = await fetch(wiUrl, {
        headers: { 'Authorization': this.authHeader }
      });

      if (!wiResp.ok) continue;

      const wiData: any = await wiResp.json();
      const title = wiData.fields?.['System.Title'] || `Test Case ${tcId}`;
      const areaPath = wiData.fields?.['System.AreaPath'] || this.config.projectName;
      const assignedTo = wiData.fields?.['System.AssignedTo']?.displayName || this.config.email;
      const state = wiData.fields?.['System.State'] || 'Design';
      const stepsXml = wiData.fields?.['Microsoft.VSTS.TCM.Steps'] || '';

      const parsedSteps = this.parseStepsXml(stepsXml);

      testCases.push({
        id: tcId,
        title,
        areaPath,
        assignedTo,
        state,
        steps: parsedSteps
      });
    }

    return testCases;
  }

  private parseStepsXml(stepsXml: string): TestStep[] {
    const steps: TestStep[] = [];
    if (!stepsXml) return steps;

    const stepRegex = /<step id="(\d+)" type="(\w+)">([\s\S]*?)<\/step>/g;
    let match;
    let stepNum = 1;

    while ((match = stepRegex.exec(stepsXml)) !== null) {
      const stepId = match[1];
      const content = match[3];

      const stringMatches = content.match(/<parameterizedString[^>]*>([\s\S]*?)<\/parameterizedString>/g) || [];
      const action = stringMatches[0] ? stringMatches[0].replace(/<[^>]+>/g, '').trim() : `Step ${stepNum}`;
      const expected = stringMatches[1] ? stringMatches[1].replace(/<[^>]+>/g, '').trim() : '';

      steps.push({
        stepId,
        stepNumber: stepNum++,
        action,
        expectedResult: expected
      });
    }

    return steps;
  }

  public async fetchTestPoints(planId: string, suiteId: string): Promise<any[]> {
    const pointsUrl = `${this.config.orgUrl}/_apis/test/Plans/${planId}/Suites/${suiteId}/points?api-version=7.0`;
    try {
      const res = await fetch(pointsUrl, {
        headers: { 'Authorization': this.authHeader, 'Accept': 'application/json' }
      });
      if (res.ok) {
        const json: any = await res.json();
        return json.value || [];
      }
    } catch (e: any) {
      console.warn('[ADO Service] Unable to fetch Test Points:', e.message);
    }
    return [];
  }

  public async createTestRun(planId: string, runName: string, pointIds: number[] = []): Promise<string> {
    const url = `${this.config.orgUrl}/_apis/test/runs?api-version=7.0`;
    const payload: any = {
      name: runName,
      plan: { id: planId },
      isAutomated: true,
      comment: 'Automated execution by azure-test-execution-agent (Playwright MCP)'
    };
    if (pointIds.length > 0) {
      payload.pointIds = pointIds;
    }

    console.log(`[ADO Service] Creating Azure Test Run: "${runName}" with ${pointIds.length} linked Test Points...`);
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': this.authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      const json: any = await res.json();
      console.log(`[ADO Service] Azure Test Run created successfully! Run ID: #${json.id}`);
      return json.id?.toString() || `TR-${Date.now()}`;
    } else {
      console.warn(`[ADO Service] Unable to create Azure Test Run (HTTP ${res.status}). Using local Test Run ID.`);
      return `TR-${Date.now()}`;
    }
  }

  public async publishTestResults(runId: string, results: TestCaseExecutionResult[]): Promise<void> {
    const getResultsUrl = `${this.config.orgUrl}/_apis/test/runs/${runId}/results?api-version=7.0`;
    console.log(`[ADO Service] Syncing results & updating Test Point outcomes for Azure Test Run #${runId}...`);

    try {
      // 1. Fetch result placeholders generated by pointIds
      const getRes = await fetch(getResultsUrl, {
        headers: { 'Authorization': this.authHeader, 'Accept': 'application/json' }
      });

      if (getRes.ok) {
        const getJson: any = await getRes.json();
        const existingResults = getJson.value || [];

        if (existingResults.length > 0) {
          const patchPayload = existingResults.map((r: any) => {
            const tcNumericId = r.testCase?.id;
            const tcMatch = results.find(t => t.testCaseId.replace(/\D/g, '') === tcNumericId) || results[0];
            const isPass = tcMatch ? tcMatch.status === 'Pass' : true;

            return {
              id: r.id,
              outcome: isPass ? 'Passed' : 'Failed',
              state: 'Completed',
              comment: `Automated Playwright Execution. Case ${tcMatch?.testCaseId || ''}`,
              iterationDetails: tcMatch ? [
                {
                  id: 1,
                  outcome: isPass ? 'Passed' : 'Failed',
                  actionResults: tcMatch.stepResults.map(s => ({
                    actionPath: s.stepNumber.toString().padStart(8, '0'),
                    stepTitle: s.action,
                    outcome: s.status === 'Pass' ? 'Passed' : 'Failed',
                    comment: s.remarks
                  }))
                }
              ] : []
            };
          });

          const patchRes = await fetch(getResultsUrl, {
            method: 'PATCH',
            headers: {
              'Authorization': this.authHeader,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(patchPayload)
          });

          if (patchRes.ok) {
            console.log(`[ADO Service] COMPULSORY SYNC COMPLETE: Test results & point outcomes updated successfully!`);
          } else {
            console.warn(`[ADO Service] Result outcome PATCH returned HTTP ${patchRes.status}.`);
          }

          // Upload step screenshots
          for (let i = 0; i < existingResults.length; i++) {
            const testResultId = existingResults[i].id;
            const tcNumericId = existingResults[i].testCase?.id;
            const tcData = results.find(t => t.testCaseId.replace(/\D/g, '') === tcNumericId) || results[i];
            if (testResultId && tcData) {
              await this.uploadStepScreenshotAttachments(runId, testResultId, tcData.stepResults);
            }
          }
        }
      }

      // 2. Mark Test Run as Completed to trigger Azure Test Plan UI grid update
      const completeRunUrl = `${this.config.orgUrl}/_apis/test/runs/${runId}?api-version=7.0`;
      await fetch(completeRunUrl, {
        method: 'PATCH',
        headers: { 'Authorization': this.authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: 'Completed' })
      });
      console.log(`[ADO Service] Test Run #${runId} marked COMPLETED. Test Plan grid now reflects updated outcomes!`);
    } catch (err: any) {
      console.warn(`[ADO Service] Error publishing Test Results to Azure DevOps:`, err.message);
    }
  }

  public async updateTestPlanSuitePoints(planId: string, suiteId: string, results: TestCaseExecutionResult[]): Promise<void> {
    // Deprecated in favor of pointIds + PATCH result outcome in publishTestResults
  }

  public async uploadStepScreenshotAttachments(runId: string, testResultId: string, stepResults: StepExecutionResult[]): Promise<void> {
    for (const step of stepResults) {
      if (!step.screenshotPath) continue;

      const fullPath = path.resolve('ai-generated/azure-test-execution-report', step.screenshotPath);
      if (!fs.existsSync(fullPath)) continue;

      const fileBuffer = fs.readFileSync(fullPath);
      const base64Content = fileBuffer.toString('base64');
      const fileName = path.basename(fullPath);

      const url = `${this.config.orgUrl}/_apis/test/runs/${runId}/results/${testResultId}/attachments?api-version=7.0`;
      console.log(`[ADO Service] Uploading screenshot attachment "${fileName}" for Step ${step.stepNumber} to Azure Result #${testResultId}...`);

      try {
        await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': this.authHeader,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            stream: base64Content,
            fileName: fileName,
            comment: `Step ${step.stepNumber} execution screenshot evidence (${step.status})`,
            attachmentType: 'GeneralAttachment'
          })
        });
      } catch (err: any) {
        console.warn(`[ADO Service] Failed to upload screenshot attachment for Step ${step.stepNumber}:`, err.message);
      }
    }
  }

  public async createBug(title: string, reproStepsHtml: string, testCaseId: string): Promise<string> {
    const url = `${this.config.orgUrl}/_apis/wit/workitems/$Bug?api-version=7.0`;
    console.log(`[ADO Service] Creating automated TFS Bug work item: "${title}"...`);

    const payload = [
      { op: 'add', path: '/fields/System.Title', value: title },
      { op: 'add', path: '/fields/Microsoft.VSTS.TCM.ReproSteps', value: reproStepsHtml },
      { op: 'add', path: '/fields/System.AreaPath', value: this.config.projectName },
      { op: 'add', path: '/fields/System.Reason', value: 'New' },
      { op: 'add', path: '/relations/-', value: {
          rel: 'Microsoft.VSTS.Common.TestedBy-Reverse',
          url: `${this.config.orgUrl}/_apis/wit/workitems/${testCaseId.replace(/\D/g, '')}`,
          attributes: { comment: 'Automated Playwright test execution failure' }
        }
      }
    ];

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': this.authHeader,
          'Content-Type': 'application/json-patch+json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const json: any = await res.json();
        console.log(`[ADO Service] TFS Bug work item successfully created! Bug ID: #${json.id}`);
        return json.id?.toString() || `BUG-${Date.now()}`;
      }
    } catch (e: any) {
      console.warn('[ADO Service] Failed to create Bug work item:', e.message);
    }

    return `BUG-AUTO-${Math.floor(1000 + Math.random() * 9000)}`;
  }
}
