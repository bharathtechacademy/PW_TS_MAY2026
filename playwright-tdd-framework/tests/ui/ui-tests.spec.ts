import {test} from '@playwright/test';
import {LoginPageSteps} from '../../page-objects/page-steps/login-page-steps.js';
import {HomePageSteps} from '../../page-objects/page-steps/home-page-steps.js';
import {CookiesPageSteps} from '../../page-objects/page-steps/cookies-page-steps.js';
import data from '../../testdata/ui/data.json' with {type: 'json'};

let loginPage: LoginPageSteps;
let homePage: HomePageSteps;
let cookiesPage: CookiesPageSteps;
let testData: any;

test.describe('Creatio CRM UI Tests', () => {

    //Initialize the page objects delivery test case. 
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPageSteps(page);
        homePage = new HomePageSteps(page);
        cookiesPage = new CookiesPageSteps(page);
    });


    //Test Case 1: Verify Cookies pop-up is displayed. 
    test('Verify Cookies pop-up is displayed', async () => {
        await loginPage.launchApplication();
        await cookiesPage.verifyCookiesPopUpIsDisplayed();
    });

    //Test Case 2: Verify Cookies pop-up content.
    test('Verify Cookies popup content', async () => {
        testData = data["Verify Cookies popup content"];
        await loginPage.launchApplication();
        await cookiesPage.verifyCookiesPopUpIsDisplayed();
        await cookiesPage.verifyCookiesPopUpContent(testData["content"]);
    });

    //Test Case 3: Verify Logos are displayed in Cookies pop-up.
    test('Verify Logos are displayed in Cookies pop-up', async () => {
        await loginPage.launchApplication();
        await cookiesPage.verifyCookiesPopUpIsDisplayed();
        await cookiesPage.verifyLogosDisplayedInCookiesPopUp();
    });

    //Test Case 4: Verify Switch buttons are displayed in Cookies pop-up.
    test('Verify Switch buttons are displayed in Cookies pop-up', async () => {
        await loginPage.launchApplication();
        await cookiesPage.verifyCookiesPopUpIsDisplayed();
        await cookiesPage.verifySwitchButtonsDisplayedInCookiesPopUp();
    });

    //Test Case 5: Verify Selection buttons are displayed in Cookies pop-up.
    test('Verify Selection buttons are displayed in Cookies pop-up', async () => {
        await loginPage.launchApplication();
        await cookiesPage.verifyCookiesPopUpIsDisplayed();
        await cookiesPage.verifySelectionButtonsDisplayedInCookiesPopUp();
    });

    //Test Case 6: Verify Show-details link is displayed in Cookies pop-up.
    test('Verify Show-details link is displayed in Cookies pop-up', async () => {
        await loginPage.launchApplication();
        await cookiesPage.verifyCookiesPopUpIsDisplayed();
        await cookiesPage.verifyShowDetailsLinkDisplayedInCookiesPopUp();
    });

    //Test Case 7: Verify cookies pop-up is disappeared after clicking on Allow All button.
    test('Verify cookies pop-up is disappeared after clicking on Allow All button', async () => {
        await loginPage.launchApplication();
        await cookiesPage.verifyCookiesPopUpIsDisplayed();
        await cookiesPage.verifySelectionButtonsDisplayedInCookiesPopUp();
        await cookiesPage.clickOnSelectionButton('Allow All');
        await cookiesPage.verifyCookiesPopUpIsDisappeared();
    });

    //Test Case 8: Verify show-details link
    test('Verify show-details link is displayed in Cookies pop-up', async () => {
        await loginPage.launchApplication();
        await cookiesPage.verifyCookiesPopUpIsDisplayed();
        await cookiesPage.verifyShowDetailsLinkDisplayedInCookiesPopUp();
        await cookiesPage.clickOnShowDetailsLink();
        await cookiesPage.verifyExpandedViewOfCookiesPopUpIsDisplayed();
    });


});