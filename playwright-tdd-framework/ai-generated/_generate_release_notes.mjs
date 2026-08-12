import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(
  fs.readFileSync(path.join(root, 'ai-generated/_release_notes_source_1512.json'), 'utf8')
);
const config = JSON.parse(fs.readFileSync(path.join(root, 'config/config.json'), 'utf8'));

const releaseVersion = 'Release 2026.08';
const releaseVersionSanitized = releaseVersion.replace(/[\s/]+/g, '_');
const environment = 'Production Login (accounts.creatio.com)';
const targetDate = '2026-08-10';
const planId = 1512;
const suiteId = 1514;
const appName = 'Creatio CRM';
const appUrl = (config.app && config.app.url) || 'https://accounts.creatio.com/login/alm';
const orgUrl = data.auth.orgUrl;
const wiUrl = (id) => `${orgUrl}/_workitems/edit/${id}`;

const now = new Date();
const pad = (n) => String(n).padStart(2, '0');
const istMs = now.getTime() + 5.5 * 60 * 60 * 1000;
const ist = new Date(istMs);
const yyyy = ist.getUTCFullYear();
const mm = pad(ist.getUTCMonth() + 1);
const dd = pad(ist.getUTCDate());
const HH = pad(ist.getUTCHours());
const MM = pad(ist.getUTCMinutes());
const SS = pad(ist.getUTCSeconds());
const timestampFile = `${yyyy}${mm}${dd}_${HH}${MM}${SS}`;
const generatedOn = `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS} (IST)`;

const points = data.points;
const total = points.length;
const passed = points.filter((p) => /passed/i.test(p.outcome)).length;
const failed = points.filter((p) => /failed/i.test(p.outcome)).length;
const blocked = points.filter((p) => /blocked/i.test(p.outcome)).length;
const notRun = total - passed - failed - blocked;
const overallPassRate = total ? ((passed / total) * 100).toFixed(1) : '0.0';
const executed = passed + failed;
const executedPassRate = executed ? ((passed / executed) * 100).toFixed(1) : '0.0';

const bugs = data.bugs;
const openBugs = bugs.filter((b) => !/closed|done|resolved|removed/i.test(b.state));
const stories = data.stories;
const releaseEligibleStates = /^(Resolved|Done|Closed|Completed)$/i;

const coverageMap = {
  7: { tcs: [159, 160, 170, 171] },
  8: { tcs: [] },
  9: { tcs: [420] },
  10: { tcs: [416, 417, 418, 419, 441, 442, 443, 444] },
};

function outcomeFor(tcId) {
  const p = points.find((x) => String(x.testCaseId) === String(tcId));
  return p ? p.outcome : 'Not in suite';
}

function storyVerification(s) {
  const issues = [];
  if (!releaseEligibleStates.test(s.state)) {
    issues.push(`State is ${s.state} (not Resolved/Done/Closed)`);
  }
  if (!s.acceptanceCriteria || !s.acceptanceCriteria.trim()) {
    issues.push('Acceptance Criteria empty');
  }
  return issues.length ? `Flagged — ${issues.join('; ')}` : 'Verified';
}

const recommendation =
  !stories.every((s) => releaseEligibleStates.test(s.state)) || failed > 0 || openBugs.length > 0
    ? 'NO-GO'
    : 'GO';

const recommendationJustification =
  recommendation === 'NO-GO'
    ? 'All four in-scope User Stories remain in New state; Suite 1514 has 3 Failed test cases with 3 open New defects (1516, 1519, 1520); overall pass rate is 76.9%.'
    : 'All exit criteria met.';

const runIds = (data.runs || [])
  .filter((r) => r.state === 'Completed' || r.totalTests >= 10)
  .slice(0, 5)
  .map((r) => r.id);
const runIdDisplay = runIds.length
  ? runIds.join(', ')
  : 'Suite 1514 point last results dated 2026-08-10; related EOT references Run 138';

function keyOutcomes(s) {
  const ac = (s.acceptanceCriteria || '')
    .split(/\n+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .slice(0, 5);
  if (ac.length) return ac.map((a) => `    - ${a}`).join('\n');
  const desc = (s.description || '').replace(/^Description:\s*/i, '').trim();
  return desc
    ? `    - ${desc
        .split(/\n+/)
        .map((x) => x.trim())
        .filter(Boolean)
        .join(' ')}`
    : '    - N/A (no AC documented in Azure DevOps)';
}

function cleanDesc(s) {
  return (s.description || 'N/A')
    .replace(/^Description:\s*/i, '')
    .replace(/\n+/g, ' ')
    .trim();
}

const md = `# Release Notes

| Field | Details |
|---|---|
| **Document Title** | Release Notes |
| **Product / Application** | ${appName} |
| **Release Version / Name** | ${releaseVersion} |
| **Build / Artifact** | N/A |
| **Environment** | ${environment} |
| **Target Release Date** | ${targetDate} |
| **Document Generated On** | ${generatedOn} |
| **Project / Organization** | ${data.auth.project} |
| **Azure DevOps Org URL** | ${orgUrl} |
| **Test Plan ID** | ${planId} |
| **Test Suite ID(s)** | ${suiteId} (${data.suite.name}) |
| **Prepared By** | ${data.email} |
| **Document Status** | Ready for Review |

---

## 1. Release Overview

This release packages the Creatio CRM **User Login Experience** capabilities planned under Epic [#1](${wiUrl(1)}): cookies consent options, cookies expanded details, login form design, and login field/credential validations (User Stories [#7](${wiUrl(7)}), [#8](${wiUrl(8)}), [#9](${wiUrl(9)}), [#10](${wiUrl(10)})).

Verification was performed against Azure Test Plan **${planId}** (${data.plan.name}), Suite **${suiteId}** (${data.suite.name}) on the live Creatio login surface (${appUrl}).

Quality posture from Azure DevOps evidence: **${passed} Passed / ${failed} Failed / ${blocked} Blocked / ${notRun} Not Run** across **${total}** test points (**${overallPassRate}%** overall pass rate). All four User Stories are still in **New** state, and **${openBugs.length}** open defects remain linked to failed cases.

**Release Recommendation:** **${recommendation}**

---

## 2. Release Metadata

| Attribute | Value |
|---|---|
| **Application Under Test (AUT)** | ${appName} |
| **Release Version** | ${releaseVersion} |
| **Release Type** | Sprint Release |
| **Application URL** | ${appUrl} |
| **Environment** | ${environment} |
| **Iteration / Sprint** | Creatio CRM\\\\Sprint 1 (stories); Plan iteration: ${data.plan.iteration || 'N/A'} |
| **Test Management Tool** | Azure DevOps Test Plans |
| **Work Item Tracking** | Azure DevOps Boards |
| **Prepared By** | ${data.email} |
| **Verification Source** | Azure DevOps REST APIs (Work Items + Test Plans) |

---

## 3. What's New — Features & User Stories in Scope

### 3.1 Features / Themes
| # | Feature / Epic ID | Title | State | Notes |
|---|---|---|---|---|
| 1 | [1](${wiUrl(1)}) | User Login Experience | New | Parent Epic for Stories 7–10; still New |

### 3.2 User Stories Included
| # | Story ID | Title | State | Assigned To | Area Path | Verification |
|---|---|---|---|---|---|---|
${stories
  .map(
    (s, i) =>
      `| ${i + 1} | [${s.id}](${wiUrl(s.id)}) | ${s.title} | ${s.state} | ${s.assignedTo} | ${s.area} | ${storyVerification(s)} |`
  )
  .join('\n')}

### 3.3 Bug Fixes Included (if any)
**No bug-fix work items were included in the provided release scope.** (Open auto-logged defects from test failures are listed in Section 5.)

### 3.4 Feature Summaries (for stakeholders)

${stories
  .map(
    (s) => `- **[${s.id}](${wiUrl(s.id)}) — ${s.title}**
  - **Summary:** ${cleanDesc(s)}
  - **Acceptance Criteria (verified present):** ${
    s.acceptanceCriteria && s.acceptanceCriteria.trim() ? 'Yes' : 'No'
  }
  - **Key outcomes:**
${keyOutcomes(s)}`
  )
  .join('\n\n')}

---

## 4. Test Plan Verification Summary

### 4.1 Plan Scope
| Attribute | Value |
|---|---|
| **Test Plan ID** | ${planId} |
| **Test Plan Name** | ${data.plan.name} |
| **Suite(s) Verified** | ${suiteId} — ${data.suite.name} (${data.suite.suiteType}) |
| **Latest Related Test Run ID(s)** | ${runIdDisplay} |
| **Verification Timestamp** | ${generatedOn} |

### 4.2 Execution Metrics
| Metric | Count |
|---|---|
| **Total Test Cases / Points in Scope** | ${total} |
| **Passed** | ${passed} |
| **Failed** | ${failed} |
| **Blocked** | ${blocked} |
| **Not Run / Not Executed** | ${notRun} |
| **Overall Pass Rate %** | ${overallPassRate}% |
| **Executed Pass Rate %** | ${executedPassRate}% *(Passed / (Passed + Failed))* |

### 4.3 Outcome Snapshot
- Total test cases in scope: **${total}**
- Passed: **${passed}**
- Failed: **${failed}**
- Blocked: **${blocked}**
- Not run: **${notRun}**
- Overall pass rate: **${overallPassRate}%**

### 4.4 Test Case Results (Detail)
| # | Test Case ID | Title | Suite | Outcome | Linked Story (if known) | Remarks |
|---|---|---|---|---|---|---|
${points
  .map((p, i) => {
    let linked = '-';
    for (const [sid, cov] of Object.entries(coverageMap)) {
      if (cov.tcs.map(String).includes(String(p.testCaseId))) {
        linked = sid;
        break;
      }
    }
    const remark = /failed/i.test(p.outcome)
      ? String(p.testCaseId) === '170'
        ? 'Open Bug 1516 — social logos assertion'
        : String(p.testCaseId) === '419'
          ? 'Open Bug 1519 — cookies popup / invalid credentials path'
          : String(p.testCaseId) === '420'
            ? 'Open Bug 1520 — cookies popup on successful login path'
            : 'Failed — see linked defect'
      : 'Completed in suite execution';
    return `| ${i + 1} | [${p.testCaseId}](${wiUrl(p.testCaseId)}) | ${p.testCaseName} | ${data.suite.name} | ${p.outcome} | ${linked} | ${remark} |`;
  })
  .join('\n')}

### 4.5 Coverage Notes (Stories ↔ Tests)
> Azure DevOps **TestedBy** relations were empty for Stories 7–10. Coverage below is inferred from Suite ${suiteId} case titles mapped to story themes.

| Story ID | Story Title | Linked Test Cases | Failed / Blocked / Not Run | Coverage Assessment |
|---|---|---|---|---|
${stories
  .map((s) => {
    const cov = coverageMap[s.id] || { tcs: [] };
    const bad = cov.tcs
      .filter((id) => {
        const o = outcomeFor(id);
        return /failed|blocked|none|not/i.test(o) || o === 'Not in suite';
      })
      .map((id) => `${id} (${outcomeFor(id)})`);
    const assess =
      cov.tcs.length === 0
        ? 'Gaps identified — no suite cases clearly mapped'
        : bad.length
          ? 'Gaps identified — failed cases remain'
          : 'Covered (theme-mapped)';
    return `| ${s.id} | ${s.title} | ${
      cov.tcs.length ? cov.tcs.join(', ') : 'None evidenced'
    } | ${bad.length ? bad.join(', ') : 'None'} | ${assess} |`;
  })
  .join('\n')}

Cross-reference: End of Test report for Plan ${planId} / Suite ${suiteId} is available under \`ai-generated/end-of-test-report/\` (Azure DevOps point outcomes remain the system of record for this Release Notes document).

---

## 5. Quality & Defect Status

### 5.1 Open / Related Defects
| # | Bug ID | Title | Severity / Priority | State | Linked Story / Test Case | Release Impact |
|---|---|---|---|---|---|---|
${openBugs
  .map((b, i) => {
    const tc =
      b.id === 1516
        ? '170 / Story 7'
        : b.id === 1519
          ? '419 / Story 10'
          : b.id === 1520
            ? '420 / Story 9'
            : 'N/A';
    return `| ${i + 1} | [${b.id}](${wiUrl(b.id)}) | ${b.title} | ${b.severity || 'N/A'} / ${
      b.priority ?? 'N/A'
    } | ${b.state} | ${tc} | Blocker (unresolved New defect from failed execution) |`;
  })
  .join('\n')}

### 5.2 Defect Links
${openBugs.map((b) => `- [${b.id}](${wiUrl(b.id)})`).join('\n')}

### 5.3 Known Issues & Waivers
| # | Issue | Workaround | Accepted By | Waiver Status |
|---|---|---|---|---|
| 1 | TC 170 — social media logos not visible as expected in cookies popup (Bug 1516) | None documented | N/A | Pending |
| 2 | TC 419 — cookies popup not displayed on invalid credentials path (Bug 1519) | None documented | N/A | Pending |
| 3 | TC 420 — cookies popup not displayed on successful login path (Bug 1520) | None documented | N/A | Pending |

---

## 6. Risks, Limitations & Dependencies

- **Risks:** Release scope User Stories remain in **New** (not Done/Resolved); open New defects from failed regression cases; login success path (TC 420) currently failing.
- **Limitations:** Stories 8 and 9 have empty Acceptance Criteria in Azure DevOps; Story 8 has no clear Suite 1514 coverage; no formal TestedBy links from stories to test cases.
- **Dependencies:** Live Creatio accounts login surface behavior (Cookiebot consent dialog, validation messaging).
- **Rollback considerations:** Follow standard release rollback procedure for Creatio CRM login experience changes.

---

## 7. Installation / Deployment Notes

| Item | Details |
|---|---|
| **Deployment Package / Build** | N/A |
| **Configuration Changes** | Unknown |
| **Database / Migration Changes** | Unknown |
| **Feature Flags** | N/A |
| **Post-deploy Smoke Checks** | Cookies popup display (TC 159); consent message (TC 160); Allow all / Allow selection / Deny (TC 171); invalid email format (TC 416 / 441); successful login (TC 420) after defect fix |

> Populate from user input and work-item evidence when available; mark **Unknown** rather than inventing deployment steps.

---

## 8. Exit Criteria & Sign-off Recommendation

| Exit Criterion | Status |
|---|---|
| All in-scope User Stories / Features verified in Azure DevOps | Partial — work items exist but remain in New |
| Acceptance Criteria present for in-scope stories | Partial — present for Stories 7 and 10; missing for 8 and 9 |
| Test Plan execution reviewed for scoped suites | Met — Suite ${suiteId} fully executed (${total}/${total}) |
| Critical / High open defects = 0 (or accepted waiver) | Not Met — ${openBugs.length} open New defects without waiver |
| Failed tests understood & dispositioned | Partial — defects logged; not resolved / waived |
| Release Notes generated | Met |

**Recommendation:** **${recommendation}** — ${recommendationJustification}

---

## 9. Approvals

| Role | Name | Date | Signature / Status |
|---|---|---|---|
| QA / Test Lead | | | Pending |
| Release Manager | | | Pending |
| Product Owner | | | Pending |
| Engineering Lead | | | Pending |

---

## 10. Document Control

| Item | Value |
|---|---|
| **Template** | Industry-standard Release Notes (Azure DevOps verified) |
| **Generated By** | azure-release-notes-agent |
| **Evidence Sources** | User Stories / Features / Bugs + Test Plan \`${planId}\` Suite \`${suiteId}\` |
| **Report Location** | \`ai-generated/release-notes/\` |
| **Related End of Test Report (if any)** | \`ai-generated/end-of-test-report/\` |

---

*This document was auto-generated by \`azure-release-notes-agent\` after verifying User Stories and Test Plan execution status in Azure DevOps. Contents are ready to copy, review, and submit as official Release Notes.*
`;

const outDir = path.join(root, 'ai-generated/release-notes');
fs.mkdirSync(outDir, { recursive: true });
const primary = path.join(
  outDir,
  `release_notes_${releaseVersionSanitized}_plan_${planId}_${timestampFile}.md`
);
const latest = path.join(outDir, 'release_notes_latest.md');
fs.writeFileSync(primary, md, 'utf8');
fs.writeFileSync(latest, md, 'utf8');
console.log('PRIMARY=' + primary);
console.log('LATEST=' + latest);
console.log('EXISTS_PRIMARY=' + fs.existsSync(primary));
console.log('EXISTS_LATEST=' + fs.existsSync(latest));
console.log('RECOMMENDATION=' + recommendation);
console.log(
  `METRICS=${passed}/${failed}/${blocked}/${notRun} overall=${overallPassRate}% executed=${executedPassRate}%`
);
