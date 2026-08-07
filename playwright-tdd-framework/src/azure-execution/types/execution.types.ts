export interface TestStep {
  stepId: string;
  stepNumber: number;
  action: string;
  expectedResult: string;
  testData?: string;
}

export interface TestCase {
  id: string;
  title: string;
  areaPath?: string;
  assignedTo?: string;
  state?: string;
  steps: TestStep[];
}

export interface StepExecutionResult {
  stepNumber: number;
  action: string;
  testData: string;
  expectedResult: string;
  status: 'Pass' | 'Fail' | 'Skipped';
  remarks: string;
  screenshotPath?: string;
  durationMs: number;
}

export interface TestCaseExecutionResult {
  testCaseId: string;
  title: string;
  status: 'Pass' | 'Fail';
  durationMs: number;
  stepResults: StepExecutionResult[];
  bugId?: string;
}

export interface TestExecutionReportData {
  planId: string;
  suiteId: string;
  executedAt: string;
  totalCases: number;
  passedCases: number;
  failedCases: number;
  totalSteps: number;
  passedSteps: number;
  failedSteps: number;
  passRate: string;
  totalDurationMs: number;
  testRunId?: string;
  testCases: TestCaseExecutionResult[];
}
