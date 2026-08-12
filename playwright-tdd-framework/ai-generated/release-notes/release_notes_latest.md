# Release Notes

| Field | Details |
|---|---|
| **Document Title** | Release Notes |
| **Product / Application** | Creatio CRM |
| **Release Version / Name** | Release 2026.08 |
| **Build / Artifact** | N/A |
| **Environment** | Production Login (accounts.creatio.com) |
| **Target Release Date** | 2026-08-10 |
| **Document Generated On** | 2026-08-10 10:00:02 (IST) |
| **Project / Organization** | Creatio CRM |
| **Azure DevOps Org URL** | https://dev.azure.com/bharattechacademy3/Creatio%20CRM |
| **Test Plan ID** | 1512 |
| **Test Suite ID(s)** | 1514 (Regression) |
| **Prepared By** | bharattechacademy3@outlook.com |
| **Document Status** | Ready for Review |

---

## 1. Release Overview

This release packages the Creatio CRM **User Login Experience** capabilities planned under Epic [#1](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/1): cookies consent options, cookies expanded details, login form design, and login field/credential validations (User Stories [#7](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/7), [#8](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/8), [#9](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/9), [#10](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/10)).

Verification was performed against Azure Test Plan **1512** (Sprint 3 - Test Plan), Suite **1514** (Regression) on the live Creatio login surface (https://accounts.creatio.com/login/alm).

Quality posture from Azure DevOps evidence: **10 Passed / 3 Failed / 0 Blocked / 0 Not Run** across **13** test points (**76.9%** overall pass rate). All four User Stories are still in **New** state, and **3** open defects remain linked to failed cases.

**Release Recommendation:** **NO-GO**

---

## 2. Release Metadata

| Attribute | Value |
|---|---|
| **Application Under Test (AUT)** | Creatio CRM |
| **Release Version** | Release 2026.08 |
| **Release Type** | Sprint Release |
| **Application URL** | https://accounts.creatio.com/login/alm |
| **Environment** | Production Login (accounts.creatio.com) |
| **Iteration / Sprint** | Creatio CRM\\Sprint 1 (stories); Plan iteration: Creatio CRM\Iteration 2 |
| **Test Management Tool** | Azure DevOps Test Plans |
| **Work Item Tracking** | Azure DevOps Boards |
| **Prepared By** | bharattechacademy3@outlook.com |
| **Verification Source** | Azure DevOps REST APIs (Work Items + Test Plans) |

---

## 3. What's New — Features & User Stories in Scope

### 3.1 Features / Themes
| # | Feature / Epic ID | Title | State | Notes |
|---|---|---|---|---|
| 1 | [1](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/1) | User Login Experience | New | Parent Epic for Stories 7–10; still New |

### 3.2 User Stories Included
| # | Story ID | Title | State | Assigned To | Area Path | Verification |
|---|---|---|---|---|---|---|
| 1 | [7](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/7) | Design and Implement Cookies consent with different options | New | Bharath Tech Academy | Creatio CRM | Flagged — State is New (not Resolved/Done/Closed) |
| 2 | [8](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/8) | Cookies consent expanded view to display the complete details | New | Unassigned | Creatio CRM | Flagged — State is New (not Resolved/Done/Closed); Acceptance Criteria empty |
| 3 | [9](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/9) | Design and Implement Login Form | New | Unassigned | Creatio CRM | Flagged — State is New (not Resolved/Done/Closed); Acceptance Criteria empty |
| 4 | [10](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/10) | Login Form Validations for basic Login with user credentials | New | Unassigned | Creatio CRM | Flagged — State is New (not Resolved/Done/Closed) |

### 3.3 Bug Fixes Included (if any)
**No bug-fix work items were included in the provided release scope.** (Open auto-logged defects from test failures are listed in Section 5.)

### 3.4 Feature Summaries (for stakeholders)

- **[7](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/7) — Design and Implement Cookies consent with different options**
  - **Summary:** As a user, while login into the application I should get Cookies consent at the bottom of the login page with necessary details
  - **Acceptance Criteria (verified present):** Yes
  - **Key outcomes:**
    - Login Page Url: https://accounts.creatio.com/login/alm
    - When user open login page user should get cookies pop-up below login form as displayed in the image.
    - Consent Message: Below content should be displayed.
    - This website uses cookies
    - We may use cookies and similar technologies to collect information about

- **[8](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/8) — Cookies consent expanded view to display the complete details**
  - **Summary:** As a user, while login into the application I should get Cookies consent at the bottom of the login page with show details link. When user click on the link user should get expanded view to see complete details and ‘about’ cookie details.
  - **Acceptance Criteria (verified present):** No
  - **Key outcomes:**
    - As a user, while login into the application I should get Cookies consent at the bottom of the login page with show details link. When user click on the link user should get expanded view to see complete details and ‘about’ cookie details.

- **[9](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/9) — Design and Implement Login Form**
  - **Summary:** As an existing user, I want to log in to my Creatio CRM account using my business email and password through a secure and well-designed form.
  - **Acceptance Criteria (verified present):** No
  - **Key outcomes:**
    - As an existing user, I want to log in to my Creatio CRM account using my business email and password through a secure and well-designed form.

- **[10](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/10) — Login Form Validations for basic Login with user credentials**
  - **Summary:** As an existing user, I want to log in to my Creatio CRM account using my business email and password through a secure and well-designed form and get the errors when we update invalid credentials.
  - **Acceptance Criteria (verified present):** Yes
  - **Key outcomes:**
    - Acceptance Criteria:
    - - Business Email field should be highlighted with red color and ‘Invalid email format’ error should be displayed when
    - user enters invalid email format and domain names. - Business Email field should be highlighted with red color and ‘Invalid email format’ error should be displayed when
    - user enters email with more than 400 chars. - Password field should be highlighted with red color and ‘Invalid value. Value must contain up to 100 characters’
    - error should be displayed when user enters password with more than 100

---

## 4. Test Plan Verification Summary

### 4.1 Plan Scope
| Attribute | Value |
|---|---|
| **Test Plan ID** | 1512 |
| **Test Plan Name** | Sprint 3 - Test Plan |
| **Suite(s) Verified** | 1514 — Regression (staticTestSuite) |
| **Latest Related Test Run ID(s)** | 3, 12, 13, 14, 16 |
| **Verification Timestamp** | 2026-08-10 10:00:02 (IST) |

### 4.2 Execution Metrics
| Metric | Count |
|---|---|
| **Total Test Cases / Points in Scope** | 13 |
| **Passed** | 10 |
| **Failed** | 3 |
| **Blocked** | 0 |
| **Not Run / Not Executed** | 0 |
| **Overall Pass Rate %** | 76.9% |
| **Executed Pass Rate %** | 76.9% *(Passed / (Passed + Failed))* |

### 4.3 Outcome Snapshot
- Total test cases in scope: **13**
- Passed: **10**
- Failed: **3**
- Blocked: **0**
- Not run: **0**
- Overall pass rate: **76.9%**

### 4.4 Test Case Results (Detail)
| # | Test Case ID | Title | Suite | Outcome | Linked Story (if known) | Remarks |
|---|---|---|---|---|---|---|
| 1 | [159](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/159) | Verify whether cookies popup is getting displayed when user launch the application | Regression | Passed | 7 | Completed in suite execution |
| 2 | [160](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/160) | Verify Cookies Consent message displayed in the Cookies popup | Regression | Passed | 7 | Completed in suite execution |
| 3 | [170](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/170) | Verify logos displayed in the Cookies popup. | Regression | Failed | 7 | Open Bug 1516 — social logos assertion |
| 4 | [171](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/171) | Verify selection buttons displayed within the Cookies pop. | Regression | Passed | 7 | Completed in suite execution |
| 5 | [416](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/416) | Verify invalid email format validation | Regression | Passed | 10 | Completed in suite execution |
| 6 | [417](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/417) | Verify excessive email length validation | Regression | Passed | 10 | Completed in suite execution |
| 7 | [418](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/418) | Verify excessive password length validation | Regression | Passed | 10 | Completed in suite execution |
| 8 | [419](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/419) | Verify invalid credentials error message | Regression | Failed | 10 | Open Bug 1519 — cookies popup / invalid credentials path |
| 9 | [420](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/420) | Verify successful login with valid credentials | Regression | Failed | 9 | Open Bug 1520 — cookies popup on successful login path |
| 10 | [441](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/441) | Verify Invalid Email Format Validation | Regression | Passed | 10 | Completed in suite execution |
| 11 | [442](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/442) | Verify Email Length Validation (>400 chars) | Regression | Passed | 10 | Completed in suite execution |
| 12 | [443](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/443) | Verify Password Length Validation (>100 chars) | Regression | Passed | 10 | Completed in suite execution |
| 13 | [444](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/444) | Verify Invalid Login Credentials Validation | Regression | Passed | 10 | Completed in suite execution |

### 4.5 Coverage Notes (Stories ↔ Tests)
> Azure DevOps **TestedBy** relations were empty for Stories 7–10. Coverage below is inferred from Suite 1514 case titles mapped to story themes.

| Story ID | Story Title | Linked Test Cases | Failed / Blocked / Not Run | Coverage Assessment |
|---|---|---|---|---|
| 7 | Design and Implement Cookies consent with different options | 159, 160, 170, 171 | 170 (Failed) | Gaps identified — failed cases remain |
| 8 | Cookies consent expanded view to display the complete details | None evidenced | None | Gaps identified — no suite cases clearly mapped |
| 9 | Design and Implement Login Form | 420 | 420 (Failed) | Gaps identified — failed cases remain |
| 10 | Login Form Validations for basic Login with user credentials | 416, 417, 418, 419, 441, 442, 443, 444 | 419 (Failed) | Gaps identified — failed cases remain |

Cross-reference: End of Test report for Plan 1512 / Suite 1514 is available under `ai-generated/end-of-test-report/` (Azure DevOps point outcomes remain the system of record for this Release Notes document).

---

## 5. Quality & Defect Status

### 5.1 Open / Related Defects
| # | Bug ID | Title | Severity / Priority | State | Linked Story / Test Case | Release Impact |
|---|---|---|---|---|---|---|
| 1 | [1516](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/1516) | [Auto-Defect] Failure in Test Case 170: Verify logos displayed in the Cookies popup. | 3 - Medium / 2 | New | 170 / Story 7 | Blocker (unresolved New defect from failed execution) |
| 2 | [1519](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/1519) | [Auto-Defect] Failure in Test Case 419: Verify invalid credentials error message | 3 - Medium / 2 | New | 419 / Story 10 | Blocker (unresolved New defect from failed execution) |
| 3 | [1520](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/1520) | [Auto-Defect] Failure in Test Case 420: Verify successful login with valid credentials | 3 - Medium / 2 | New | 420 / Story 9 | Blocker (unresolved New defect from failed execution) |

### 5.2 Defect Links
- [1516](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/1516)
- [1519](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/1519)
- [1520](https://dev.azure.com/bharattechacademy3/Creatio%20CRM/_workitems/edit/1520)

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
| Test Plan execution reviewed for scoped suites | Met — Suite 1514 fully executed (13/13) |
| Critical / High open defects = 0 (or accepted waiver) | Not Met — 3 open New defects without waiver |
| Failed tests understood & dispositioned | Partial — defects logged; not resolved / waived |
| Release Notes generated | Met |

**Recommendation:** **NO-GO** — All four in-scope User Stories remain in New state; Suite 1514 has 3 Failed test cases with 3 open New defects (1516, 1519, 1520); overall pass rate is 76.9%.

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
| **Evidence Sources** | User Stories / Features / Bugs + Test Plan `1512` Suite `1514` |
| **Report Location** | `ai-generated/release-notes/` |
| **Related End of Test Report (if any)** | `ai-generated/end-of-test-report/` |

---

*This document was auto-generated by `azure-release-notes-agent` after verifying User Stories and Test Plan execution status in Azure DevOps. Contents are ready to copy, review, and submit as official Release Notes.*
