import { Page } from "@playwright/test";
import loginPage from '../page-elements/login-page-elements.json' with{type: 'json'};
import { WebCommons } from "../../commons/ui/web-commons.js";
import config from '../../config/config.json' with {type: 'json'};

export class LoginPageSteps {
    page: Page
    web: WebCommons

    constructor(page: Page) {
        this.page = page;
        this.web = new WebCommons(page);
    }

    //Method to launch the application
    async launchApplication() {
        await this.web.launchApplication(config.app.url, config.app.title);
    }

    //Method to verify login page is displayed 
    async verifyLoginPageIsDisplayed() {
        await this.web.isElementVisible(loginPage.loginPageHeader);
    }

    //Method to enter username and password 
    async enterCredentials(username: string, password?: string) {
        await this.web.enterText(loginPage.businessEmailTextBox, username);
        if (password) {
            await this.web.enterText(loginPage.passwordTextBox, password);
        }
    }

    //Method to click on login button
    async clickLoginButton() {
        await this.web.clickElement(loginPage.loginButton);
    }

    //Method to click on forgot password link
    async clickForgotPasswordLink() {
        await this.web.clickElement(loginPage.forgotPasswordLink);
    }

    //Method to verify forgot password confirmation message is displayed
    async verifyForgotPasswordConfirmationMessageIsDisplayed() {
        await this.web.isElementVisible(loginPage.forgotPasswordConfirmationMsg);
    }

    //Method to click on the sign-up link
    async clickSignUpLink() {
        await this.web.clickElement(loginPage.signUpLink);
    }

    //Method to verify social media login buttons are displayed
    async verifySocialMediaLoginButtonsAreDisplayed() {
        await this.web.isElementVisible(loginPage.googleIcon);
        await this.web.isElementVisible(loginPage.linkedInIcon);
    }

    //Method to verify login error message is displayed
    async verifyLoginErrorMessageIsDisplayed() {
        await this.web.isElementVisible(loginPage.loginErrorMessage);
    }

    //Method to enter business email and blur to trigger field validation
    async enterBusinessEmail(email: string) {
        await this.web.enterText(loginPage.businessEmailTextBox, email);
        await this.web.blurElement(loginPage.businessEmailTextBox);
    }

    //Method to enter password and blur to trigger field validation
    async enterPassword(password: string) {
        await this.web.enterText(loginPage.passwordTextBox, password);
        await this.web.blurElement(loginPage.passwordTextBox);
    }

    //Method to verify Business Email field is highlighted as invalid (red)
    async verifyBusinessEmailFieldIsHighlightedInvalid() {
        await this.web.isElementVisible(loginPage.businessEmailInvalidHighlight);
        await this.web.isElementVisible(loginPage.businessEmailInvalidIcon);
    }

    //Method to verify Password field is highlighted as invalid (red)
    async verifyPasswordFieldIsHighlightedInvalid() {
        await this.web.isElementVisible(loginPage.passwordInvalidHighlight);
        await this.web.isElementVisible(loginPage.passwordInvalidIcon);
    }

    //Method to verify Business Email validation error message
    async verifyBusinessEmailValidationError(expectedError: string) {
        const actualError: string | null = await this.web.getText(loginPage.businessEmailValidationError);
        const normalized = (actualError || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        await this.web.verifyValueContains(normalized, expectedError);
    }

    //Method to verify Password validation error message
    async verifyPasswordValidationError(expectedError: string) {
        const actualError: string | null = await this.web.getText(loginPage.passwordValidationError);
        const normalized = (actualError || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
        await this.web.verifyValueContains(normalized, expectedError);
    }

}