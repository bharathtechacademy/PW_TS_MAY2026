import { test, TestInfo } from '@playwright/test';
import { LoginPageSteps } from '../../page-objects/page-steps/login-page-steps.js';
import { HomePageSteps } from '../../page-objects/page-steps/home-page-steps.js';
import { CookiesPageSteps } from '../../page-objects/page-steps/cookies-page-steps.js';
import data from '../../testdata/ui/data.json' with {type: 'json'};
import { WebCommons } from '../../commons/ui/web-commons.js';

let loginPage: LoginPageSteps;
let homePage: HomePageSteps;
let cookiesPage: CookiesPageSteps;
let testData: any;
let testInfo: TestInfo;
let currentAzureTestCaseId: number | undefined;

function setAzureTestCaseId(testCaseId: number) {
    currentAzureTestCaseId = testCaseId;
}

test.describe('Creatio CRM UI Tests', () => {

    //Initialize the page objects delivery test case. 
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPageSteps(page);
        homePage = new HomePageSteps(page);
        cookiesPage = new CookiesPageSteps(page);
    });

    //Update the test status at the end of the execution. 
    test.afterEach(async ({ page }, testInfo: TestInfo) => {
        const azureTestCaseId = currentAzureTestCaseId ;
        const status = testInfo.status === 'passed' ? 'Passed' : 'Failed';
        if (!azureTestCaseId) {
            console.warn('Azure Test Case ID is not set. Skipping Azure test status update.');
            return;
        }
        const commons = new WebCommons(page);
        commons.updateAzureTestStatus(azureTestCaseId, status);
    });

    //Test Case 1: Verify Cookies pop-up is displayed. 
    test('Verify Cookies pop-up is displayed', async () => {
        setAzureTestCaseId(159);
        await loginPage.launchApplication();
        await cookiesPage.verifyCookiesPopUpIsDisplayed();
    });

    //Test Case 2: Verify Cookies pop-up content.
    test('Verify Cookies popup content', async () => {
        setAzureTestCaseId(160);
        testData = data["Verify Cookies popup content"];
        await loginPage.launchApplication();
        await cookiesPage.verifyCookiesPopUpIsDisplayed();
        await cookiesPage.verifyCookiesPopUpContent(testData["content"]);
    });

    //Test Case 3: Verify Logos are displayed in Cookies pop-up.
    test('Verify Logos are displayed in Cookies pop-up', async () => {
        setAzureTestCaseId(170);
        await loginPage.launchApplication();
        await cookiesPage.verifyCookiesPopUpIsDisplayed();
        await cookiesPage.verifyLogosDisplayedInCookiesPopUp();
    });

    //Test Case 4: Verify Switch buttons are displayed in Cookies pop-up.
    test('Verify Switch buttons are displayed in Cookies pop-up', async () => {
        setAzureTestCaseId(171);
        await loginPage.launchApplication();
        await cookiesPage.verifyCookiesPopUpIsDisplayed();
        await cookiesPage.verifySwitchButtonsDisplayedInCookiesPopUp();
    });

//     //Test Case 5: Verify Selection buttons are displayed in Cookies pop-up.
//     test('Verify Selection buttons are displayed in Cookies pop-up', async () => {
//         await loginPage.launchApplication();
//         await cookiesPage.verifyCookiesPopUpIsDisplayed();
//         await cookiesPage.verifySelectionButtonsDisplayedInCookiesPopUp();
//     });

//     //Test Case 6: Verify Show-details link is displayed in Cookies pop-up.
//     test('Verify Show-details link is displayed in Cookies pop-up', async () => {
//         await loginPage.launchApplication();
//         await cookiesPage.verifyCookiesPopUpIsDisplayed();
//         await cookiesPage.verifyShowDetailsLinkDisplayedInCookiesPopUp();
//     });

//     //Test Case 7: Verify cookies pop-up is disappeared after clicking on Allow All button.
//     test('Verify cookies pop-up is disappeared after clicking on Allow All button', async () => {
//                     await loginPage.launchApplication();
//         await cookiesPage.verifyCookiesPopUpIsDisplayed();
//                   await cookiesPage.verifySelectionButtonsDisplayedInCookiesPopUp();
//         await cookiesPage.clickOnSelectionButton('Allow All');
//               await cookiesPage.verifyCookiesPopUpIsDisappeared();
//     });

//     //Test Case 8: Verify show-details link
//     test('Verify show-details link is displayed in Cookies pop-up', async () => {
//         await loginPage.launchApplication();

//         await cookiesPage.verifyShowDetailsLinkDisplayedInCookiesPopUp();
//         await cookiesPage.clickOnShowDetailsLink();
//         await cookiesPage.verifyExpandedViewOfCookiesPopUpIsDisplayed();
//     });

//     //Test Case 9: Verify login functionality with valid credentials.
//     test('Verify login functionality with valid credentials', async ({ }, testInfo: TestInfo) => {
//         testData = data[testInfo.title as keyof typeof data];
//         await loginPage.launchApplication();
//         await cookiesPage.verifyCookiesPopUpIsDisplayed();
//         await cookiesPage.verifySelectionButtonsDisplayedInCookiesPopUp();
//         await cookiesPage.clickOnSelectionButton('Allow All');
//         await cookiesPage.verifyCookiesPopUpIsDisappeared();
//         await loginPage.verifyLoginPageIsDisplayed();
//         await loginPage.enterCredentials(testData["username"], testData["password"]);
//         await loginPage.clickLoginButton();
//         await homePage.verifyHomePageDisplayed();
//     });

//     //Test Case 10: Verify login functionality with invalid credentials.
//     test('Verify login functionality with invalid credentials', async ({ }, testInfo: TestInfo) => {
//         testData = data[testInfo.title as keyof typeof data];
//         await loginPage.launchApplication();
//         await cookiesPage.verifyCookiesPopUpIsDisplayed();
//         await cookiesPage.verifySelectionButtonsDisplayedInCookiesPopUp();
//         await cookiesPage.clickOnSelectionButton('Allow All');
//         await cookiesPage.verifyCookiesPopUpIsDisappeared();
//         await loginPage.verifyLoginPageIsDisplayed();
//         await loginPage.enterCredentials(testData["username"], testData["password"]);
//         await loginPage.clickLoginButton();
//         await loginPage.verifyLoginErrorMessageIsDisplayed();
//     });

//     //Test Case 11: Verify logout functionality with valid credentials.
//     test('Verify logout functionality with valid credentials', async ({ }, testInfo: TestInfo) => {
//         testData = data[testInfo.title as keyof typeof data];
//         await loginPage.launchApplication();
//         await cookiesPage.verifyCookiesPopUpIsDisplayed();
//         await cookiesPage.verifySelectionButtonsDisplayedInCookiesPopUp();
//         await cookiesPage.clickOnSelectionButton('Allow All');
//         await cookiesPage.verifyCookiesPopUpIsDisappeared();
//         await loginPage.verifyLoginPageIsDisplayed();
//         await loginPage.enterCredentials(testData["username"], testData["password"]);
//         await loginPage.clickLoginButton();
//         await homePage.verifyHomePageDisplayed();
//         await homePage.verifyProfileIconAndClick();
//         await homePage.clickLogoutButton();
//         await loginPage.verifyLoginPageIsDisplayed();
//     });

//     // Azure TC #441: Verify Invalid Email Format Validation
//     test('Verify Invalid Email Format Validation', async ({ }, testInfo: TestInfo) => {
//         testData = data[testInfo.title as keyof typeof data];
//         await loginPage.launchApplication();
//         await cookiesPage.verifyCookiesPopUpIsDisplayed();
//         await cookiesPage.clickOnSelectionButton('Allow All');
//         await cookiesPage.verifyCookiesPopUpIsDisappeared();
//         await loginPage.verifyLoginPageIsDisplayed();
//         await loginPage.enterBusinessEmail(testData["username"]);
//         await loginPage.verifyBusinessEmailFieldIsHighlightedInvalid();
//         await loginPage.verifyBusinessEmailValidationError(testData["expectedError"]);
//     });

//     // Azure TC #442: Verify Email Length Validation (>400 chars)
//     test.skip('Verify Email Length Validation (>400 chars)', async ({ }, testInfo: TestInfo) => {
//         testData = data[testInfo.title as keyof typeof data];
//         await loginPage.launchApplication();
//         await cookiesPage.verifyCookiesPopUpIsDisplayed();
//         await cookiesPage.clickOnSelectionButton('Allow All');
//         await cookiesPage.verifyCookiesPopUpIsDisappeared();
//         await loginPage.verifyLoginPageIsDisplayed();
//         await loginPage.enterBusinessEmail(testData["username"]);
//         await loginPage.verifyBusinessEmailFieldIsHighlightedInvalid();
//         await loginPage.verifyBusinessEmailValidationError(testData["expectedError"]);
//     });

//     // Azure TC #443: Verify Password Length Validation (>100 chars)
//     test.skip('Verify Password Length Validation (>100 chars)', async ({ }, testInfo: TestInfo) => {
//         testData = data[testInfo.title as keyof typeof data];
//         await loginPage.launchApplication();
//         await cookiesPage.verifyCookiesPopUpIsDisplayed();
//         await cookiesPage.clickOnSelectionButton('Allow All');
//         await cookiesPage.verifyCookiesPopUpIsDisappeared();
//         await loginPage.verifyLoginPageIsDisplayed();
//         await loginPage.enterPassword(testData["password"]);
//         await loginPage.verifyPasswordFieldIsHighlightedInvalid();
//         await loginPage.verifyPasswordValidationError(testData["expectedError"]);
//     });
   

});