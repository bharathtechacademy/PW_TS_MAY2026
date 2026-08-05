import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

test('Automate Cursor Download', async ({ page }) => {
    // Navigate to the Cursor download page
    await page.goto('https://cursor.com/download');

    // Start waiting for the download event BEFORE clicking the download button
    const downloadPromise = page.waitForEvent('download');

    // Click the specific download button. 
    // We are looking for a button that contains the word "Download"
    await page.getByRole('button', { name: /Download/i }).first().click();

    // Wait for the download process to start and complete
    const download = await downloadPromise;

    // Define the custom path to save the downloaded file
    const downloadsFolder = path.join(__dirname, '..', 'downloads');
    const customPath = path.join(downloadsFolder, download.suggestedFilename());
    
    // Save the downloaded file to the custom path
    await download.saveAs(customPath);

    // Verify the file was actually saved
    expect(fs.existsSync(customPath)).toBeTruthy();
    console.log(`File downloaded successfully to: ${customPath}`);
});
