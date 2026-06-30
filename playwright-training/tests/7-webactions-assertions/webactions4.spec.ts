import { test, expect } from '@playwright/test';

test('Frames Assignment', async ({ page }) => {

    // 1. Enter URL and Launch the application (https://demoqa.com/frames)
    await page.goto("https://demoqa.com/frames");

    // 2. Locate Main window element
    const mainWindowElement = await page.locator('//h1[@class="text-center"]');

    //Locate the frame. 
    const frame = await page.frameLocator('//iframe[@id="frame1"]');

    // 3. Locate Frame Element
    const frameElement = await frame.locator('//h1[@id="sampleHeading"]');

    // 4. Copy and Print text from frame element
    console.log(await frameElement.textContent());

    // 5. Copy and Print text from main window element
    console.log(await mainWindowElement.textContent());

});