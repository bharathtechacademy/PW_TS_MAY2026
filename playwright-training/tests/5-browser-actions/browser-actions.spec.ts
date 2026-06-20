//browser actions : Browser actions are nothing but the default methods provided by Playwright to control the browser. 

import { test, expect,chromium } from '@playwright/test';

test('Browser actions', async ({  }) => {

    // Launch the chrome browser engine. (chromium, firefox, webkit)
    const browserEngine = await chromium.launch({channel: 'msedge', headless: false});

    // Launch the browser context within the browser engine. (kind of incognito)
    const browserContext = await browserEngine.newContext();

    // Clear all the cookies within the browser context.
    await browserContext.clearCookies();

    // Launch the new page within the browser context. (tab)
    const page = await browserContext.newPage();

    // Maximize the page to a specific resolution. (1920, 1080)
    await page.setViewportSize({ width: 1920, height: 1080 });

    // Launch the application URL. (https://www.google.com/)
    await page.goto('https://www.google.com/');

    // Verify the application is launched properly. (verify title of page is Google)
    await expect(page).toHaveTitle('Google');

    // Launch the different application https://playwright.dev/ within the page.
    await page.goto('https://playwright.dev/');

    // Navigate back to the previous application. 
    await page.goBack();

    // Navigate forward to the next application.
    await page.goForward();

    // Refresh the page.
    await page.reload();

    // Launch the new tab within the same window. 
    const newPage = await browserContext.newPage();

    // Launch the application www.selenium.dev. on new tab
    await newPage.goto('https://www.selenium.dev/');

    // Go back to the previous tab and display the Playwright application. 
    await page.bringToFront();

    // Capture the URL displayed on the current browser window. 
    let currentURL = page.url();
    console.log('Current URL: ', currentURL);
    
    // Close the current page. 
    await page.close();

    // Close the browser context and all the pages within it.
    await browserContext.close();
    await browserEngine.close();


});