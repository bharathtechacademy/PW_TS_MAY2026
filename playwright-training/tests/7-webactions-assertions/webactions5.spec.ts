import { test, expect } from '@playwright/test';

test('Frames Assignment', async ({ page }) => {

    // 1. Enter URL and Launch the application (https://demoqa.com/frames)
    await page.goto("https://selectorshub.com/xpath-practice-page/");

    // 2. Locate username element
    const username = await page.locator('input[title="user name field"]');

    // 3. Type username in the username field
    await username.fill("Admin");

    // Take screenshot of the username field after filling it
    await username.screenshot({ path: 'screenshots/username_field.png' });
    await page.screenshot({ path: 'screenshots/page_after_username.png' });
    await page.screenshot({ path: 'screenshots/full_page_after_username.png' , fullPage: true });
});