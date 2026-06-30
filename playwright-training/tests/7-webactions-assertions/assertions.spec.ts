//Assertions : Assertions are nothing but the default methods provided by Playwright to compare expected result vs actual result.

//In Playwright, there are two different types of assertions available. 

//1. Hard Assertions : If an assertion fails, the test will stop executing immediately. 
//2. Soft Assertions : If an assertion fails, the test will continue execution and fail at the end of the test.


//Syntax of Hard Assertions :
//expect(actual).toBe(expected); 

//Syntax of Soft Assertions :
//expect.soft(actual).toBe(expected); 

import { test, expect } from '@playwright/test';

// test('Hard Assertions', async ({ page }) => {
    
//     //Launch the application
//     await page.goto('https://www.google.com/');

//     //Verify the page title
//     await expect(page).toHaveTitle("Google2");
//     console.log("Page title verified successfully. ");

//     //Verify the page URL
//     await expect(page).toHaveURL("https://www.google.com/");
//     console.log("Page URL verified successfully. ");

//     console.log("Execution completed successfully. ");
// });

test('Soft Assertions', async ({ page }) => {
    
    //Launch the application
    await page.goto('https://www.google.com/');

    //Verify the page title
    await expect.soft(page).toHaveTitle("Google2");
    console.log("Page title verified successfully. ");

    //Verify the page URL
    await expect.soft(page).toHaveURL("https://www.google2.com/");
    console.log("Page URL verified successfully. ");

    console.log("Execution completed successfully. ");
});

//expect(element).toBeVisible() : This assertion is used to verify whether the element is visible on the page or not.
//expect(element).toBeEnabled() : This assertion is used to verify whether the element is enabled on the page or not.
//expect(element).toBeHidden() : This assertion is used to verify whether the element is hidden on the page or not.
//expect(element).toBeDisabled() : This assertion is used to verify whether the element is disabled on the page or not.
//expect(element).toBeChecked() : This assertion is used to verify whether the checkbox or radio button is checked on the page or not.
//expect(element).toHaveText() : This assertion is used to verify whether the element has the expected text or not.
//expect(element).toContainText() : This assertion is used to verify whether the element contains the expected text or not.
//expect(element).toHaveAttribute("placeholder") : This assertion is used to verify whether the element has the expected attribute or not.
//expect(element).toHaveAttribute("placeholder", "Enter your name") : This assertion is used to verify whether the element has the expected attribute with the expected value or not.
//expect(element).toHaveValue() : This assertion is used to verify whether the textbox element has the expected value or not.

//expect(page).toHaveTitle() : This assertion is used to verify whether the page has the expected title or not.
//expect(page).toHaveURL() : This assertion is used to verify whether the page has the expected URL or not.

//expect(actual).toBe() : This assertion is used to verify whether the element is equal to the expected value or not.
//expect(actual).toInclude() : This assertion is used to verify whether the element includes the expected value or not.