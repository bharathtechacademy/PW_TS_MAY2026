//Alerts Assignment

import { test, expect } from '@playwright/test';

test('Alerts Assignment', async ({ page }) => {
    // 1. Enter URL and Launch the application(https://demoqa.com/alerts)
    await page.goto("https://demoqa.com/alerts");

    // 2. Locate Alert buttons to trigger the alerts
    const infoAlert = await page.locator('//button[@id="alertButton"]');
    const confirmationAlert = await page.locator('//button[@id="confirmButton"]');
    const promptAlert = await page.locator('//button[@id="promtButton"]');

    // 3. Click on the information alert and copy the alert message and then select OK button
    page.once('dialog', async dialog => {

        //Print the alert message. 
        console.log(await dialog.message());

        //Click on the OK button. 
        await dialog.accept();

    })

    //Trigger the information alert. 
    await infoAlert.click();

    // 4. Click on the Confirmation alert, copy the alert message, and select the Cancel button.
    page.once('dialog', async dialog => {

        //Print the alert message. 
        console.log(await dialog.message());

        //Click on the Cancel button. 
        await dialog.dismiss();

    })

    //Trigger the confirmation alert. 
    await confirmationAlert.click();


    // 5. Click on the prompt alert.Copy the alert message.Enter text.Then Select OK button.
    page.once('dialog', async dialog => {

        //Print the alert message. 
        console.log(await dialog.message());

        //Click on the OK button after updating text
        await dialog.accept("Playwright");

    })

    //Trigger the confirmation alert. 
    await promptAlert.click();
});