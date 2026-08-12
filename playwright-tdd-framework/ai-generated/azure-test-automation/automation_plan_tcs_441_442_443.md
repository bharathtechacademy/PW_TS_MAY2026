# Automation Plan — Azure TC #441 #442 #443

| Field | Details |
|---|---|
| **Generated On** | 2026-08-10 |
| **Mode** | Individual Test Case IDs |
| **Layer** | UI |
| **Target Spec** | `tests/ui/ui-tests.spec.ts` |

## Gap Analysis

| Azure ID | Title | Status | Rationale |
|---|---|---|---|
| 441 | Verify Invalid Email Format Validation | **New — Automate** | No matching `test()` / Azure TC comment |
| 442 | Verify Email Length Validation (>400 chars) | **New — Automate** | No matching `test()` / Azure TC comment |
| 443 | Verify Password Length Validation (>100 chars) | **New — Automate** | No matching `test()` / Azure TC comment |

## Design Mapping

Shared flow (framework convention + Azure cookies step):
1. `loginPage.launchApplication()`
2. `cookiesPage.verifyCookiesPopUpIsDisplayed()`
3. `cookiesPage.clickOnSelectionButton('Allow All')` *(required for reliable field interaction; Azure only asserts popup appears)*
4. `cookiesPage.verifyCookiesPopUpIsDisappeared()`
5. Field entry + validation assertions via `LoginPageSteps`

| Azure ID | Steps → Methods |
|---|---|
| 441 | Enter invalid email → `enterBusinessEmail` + `verifyBusinessEmailFieldIsHighlightedInvalid` + `verifyBusinessEmailValidationError` |
| 442 | Enter >400 char email → same email validation methods |
| 443 | Enter >100 char password → `enterPassword` + `verifyPasswordFieldIsHighlightedInvalid` + `verifyPasswordValidationError` |

## Files to Touch

- `page-objects/page-elements/login-page-elements.json` — validation locators
- `page-objects/page-steps/login-page-steps.ts` — enter/blur + validation methods
- `commons/ui/web-commons.ts` — `blurElement` helper
- `testdata/ui/data.json` — titles keyed to exact `test()` names
- `tests/ui/ui-tests.spec.ts` — three new tests
