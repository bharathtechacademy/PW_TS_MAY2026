import fs from 'fs';
import path from 'path';
import { TestExecutionReportData } from '../types/execution.types.js';

export class ReportGenerator {
  private outputDir: string;

  constructor() {
    this.outputDir = path.resolve('ai-generated/azure-test-execution-report');
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  public generateHtmlReport(data: TestExecutionReportData): string {
    const reportFileName = `execution_report_plan_${data.planId}_suite_${data.suiteId}.html`;
    const fullPath = path.join(this.outputDir, reportFileName);

    const testCaseCardsHtml = data.testCases.map((tc, index) => {
      const tcPass = tc.status === 'Pass';
      const tcBadgeClass = tcPass ? 'badge-pass' : 'badge-fail';

      const stepRowsHtml = tc.stepResults.map(step => {
        const stepPass = step.status === 'Pass';
        const stepBadgeClass = stepPass ? 'badge-pass' : 'badge-fail';
        return `
          <tr>
            <td style="font-weight: 600; text-align: center;">${step.stepNumber}</td>
            <td>${this.escapeHtml(step.action)}</td>
            <td style="color: var(--text-muted); font-size: 13px;">${this.escapeHtml(step.testData)}</td>
            <td>${this.escapeHtml(step.expectedResult)}</td>
            <td text-align="center"><span class="badge ${stepBadgeClass}">${step.status}</span></td>
            <td style="font-size: 13px;">${this.escapeHtml(step.remarks)}</td>
            <td style="text-align: center;">
              ${step.screenshotPath ? `<img src="${step.screenshotPath}" alt="Step ${step.stepNumber}" class="screenshot-thumb" onclick="openModal(this.src)">` : '<span style="color:var(--text-muted)">N/A</span>'}
            </td>
          </tr>
        `;
      }).join('');

      return `
        <div class="test-case-card">
          <div class="test-case-header" onclick="toggleAccordion('tc-body-${index}')">
            <div class="tc-title-wrapper">
              <span class="tc-id">${tc.testCaseId}</span>
              <span class="tc-title">${this.escapeHtml(tc.title)}</span>
            </div>
            <div class="tc-meta">
              <span class="duration">${(tc.durationMs / 1000).toFixed(2)}s</span>
              <span class="badge ${tcBadgeClass}">${tc.status}</span>
              ${tc.bugId ? `<span class="bug-link">Bug #${tc.bugId}</span>` : ''}
              <span class="accordion-icon" id="icon-tc-body-${index}">▼</span>
            </div>
          </div>
          <div class="test-case-body" id="tc-body-${index}" style="display: block;">
            <table class="steps-table">
              <thead>
                <tr>
                  <th style="width: 60px;">Step #</th>
                  <th style="width: 25%;">Action</th>
                  <th style="width: 15%;">Test Data</th>
                  <th style="width: 25%;">Expected Result</th>
                  <th style="width: 90px;">Status</th>
                  <th>Remarks</th>
                  <th style="width: 100px;">Evidence</th>
                </tr>
              </thead>
              <tbody>
                ${stepRowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }).join('');

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Azure Test Execution Report - Plan #${data.planId} Suite #${data.suiteId}</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-primary: #0f172a;
      --bg-secondary: #1e293b;
      --card-bg: #1e293b;
      --card-border: #334155;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --accent-blue: #38bdf8;
      --accent-green: #22c55e;
      --accent-red: #ef4444;
      --accent-orange: #f97316;
      --badge-pass-bg: rgba(34, 197, 94, 0.15);
      --badge-pass-text: #4ade80;
      --badge-fail-bg: rgba(239, 68, 68, 0.15);
      --badge-fail-text: #f87171;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
    }

    body {
      background-color: var(--bg-primary);
      color: var(--text-main);
      padding: 24px;
      line-height: 1.5;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 28px 32px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    }

    .header-title h1 {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.5px;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .header-title p {
      color: var(--text-muted);
      font-size: 14px;
      margin-top: 6px;
    }

    .chip-mcp {
      background: rgba(56, 189, 248, 0.1);
      color: var(--accent-blue);
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .metric-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .metric-card .label {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .metric-card .value {
      font-size: 28px;
      font-weight: 700;
      margin-top: 8px;
      color: var(--text-main);
    }

    .metric-card.pass .value { color: var(--accent-green); }
    .metric-card.fail .value { color: var(--accent-red); }
    .metric-card.rate .value { color: var(--accent-blue); }

    .test-case-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      margin-bottom: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .test-case-header {
      padding: 16px 20px;
      background: rgba(255, 255, 255, 0.02);
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
      transition: background 0.2s;
    }

    .test-case-header:hover {
      background: rgba(255, 255, 255, 0.05);
    }

    .tc-title-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .tc-id {
      background: #334155;
      color: #f1f5f9;
      padding: 4px 8px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
    }

    .tc-title {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-main);
    }

    .tc-meta {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .duration {
      font-size: 13px;
      color: var(--text-muted);
    }

    .badge {
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .badge-pass {
      background: var(--badge-pass-bg);
      color: var(--badge-pass-text);
      border: 1px solid rgba(34, 197, 94, 0.3);
    }

    .badge-fail {
      background: var(--badge-fail-bg);
      color: var(--badge-fail-text);
      border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .bug-link {
      background: rgba(249, 115, 22, 0.15);
      color: var(--accent-orange);
      border: 1px solid rgba(249, 115, 22, 0.3);
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
    }

    .accordion-icon {
      font-size: 12px;
      color: var(--text-muted);
      transition: transform 0.2s;
    }

    .test-case-body {
      padding: 20px;
      border-top: 1px solid var(--card-border);
      background: #0f172a;
    }

    .steps-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    .steps-table th {
      background: #1e293b;
      color: var(--text-muted);
      font-weight: 600;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: 0.5px;
      padding: 10px 14px;
      text-align: left;
      border-bottom: 1px solid var(--card-border);
    }

    .steps-table td {
      padding: 12px 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      vertical-align: middle;
    }

    .screenshot-thumb {
      width: 50px;
      height: 32px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid var(--card-border);
      cursor: pointer;
      transition: transform 0.2s;
    }

    .screenshot-thumb:hover {
      transform: scale(1.15);
      border-color: var(--accent-blue);
    }

    /* Image Modal */
    .modal {
      display: none;
      position: fixed;
      z-index: 1000;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.85);
      backdrop-filter: blur(4px);
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      max-width: 90%;
      max-height: 90%;
      border-radius: 8px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
    }

    .modal-close {
      position: absolute;
      top: 20px;
      right: 30px;
      color: white;
      font-size: 36px;
      font-weight: bold;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="header-title">
        <h1>
          Azure Test Execution Report
          <span class="chip-mcp">Playwright MCP Engine</span>
        </h1>
        <p>Executed on ${data.executedAt} | Plan ID: #${data.planId} | Suite ID: #${data.suiteId} ${data.testRunId ? `| ADO Test Run: #${data.testRunId}` : ''}</p>
      </div>
    </div>

    <div class="metrics-grid">
      <div class="metric-card">
        <div class="label">Total Test Cases</div>
        <div class="value">${data.totalCases}</div>
      </div>
      <div class="metric-card pass">
        <div class="label">Passed Cases</div>
        <div class="value">${data.passedCases}</div>
      </div>
      <div class="metric-card fail">
        <div class="label">Failed Cases</div>
        <div class="value">${data.failedCases}</div>
      </div>
      <div class="metric-card">
        <div class="label">Total Steps</div>
        <div class="value">${data.totalSteps}</div>
      </div>
      <div class="metric-card rate">
        <div class="label">Pass Rate</div>
        <div class="value">${data.passRate}%</div>
      </div>
      <div class="metric-card">
        <div class="label">Total Duration</div>
        <div class="value">${(data.totalDurationMs / 1000).toFixed(2)}s</div>
      </div>
    </div>

    <div class="test-cases-list">
      ${testCaseCardsHtml}
    </div>
  </div>

  <div id="imgModal" class="modal" onclick="closeModal()">
    <span class="modal-close" onclick="closeModal()">&times;</span>
    <img class="modal-content" id="modalImg">
  </div>

  <script>
    function toggleAccordion(id) {
      const body = document.getElementById(id);
      const icon = document.getElementById('icon-' + id);
      if (body.style.display === 'none') {
        body.style.display = 'block';
        icon.style.transform = 'rotate(0deg)';
      } else {
        body.style.display = 'none';
        icon.style.transform = 'rotate(-90deg)';
      }
    }

    function openModal(src) {
      document.getElementById('imgModal').style.display = 'flex';
      document.getElementById('modalImg').src = src;
    }

    function closeModal() {
      document.getElementById('imgModal').style.display = 'none';
    }
  </script>
</body>
</html>`;

    fs.writeFileSync(fullPath, htmlContent, 'utf-8');
    console.log(`[Report Generator] Executive HTML Report successfully generated at:\n  ${fullPath}`);

    return fullPath;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
