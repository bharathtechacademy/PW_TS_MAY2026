import { chromium } from '@playwright/test';

async function testMethods() {
  console.log('--- Test Method 1: Using channel chrome or realistic flags ---');
  try {
    const browser = await chromium.launch({
      headless: true,
      channel: 'chrome',
      args: ['--disable-blink-features=AutomationControlled']
    });
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();
    await page.goto('https://www.naukri.com/sdet-jobs-in-hyderabad', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(3000);
    console.log('Method 1 Title:', await page.title());
    const tuples = await page.$$('.srp-jobtuple-wrapper, article.jobTuple, div.tuple');
    console.log('Method 1 Tuples found:', tuples.length);
    await browser.close();
  } catch (e: any) {
    console.log('Method 1 error:', e.message);
  }

  console.log('\n--- Test Method 2: Google Search for Live Naukri Job Listings ---');
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    const googleUrl = 'https://www.google.com/search?q=site:naukri.com/job-listings+playwright+typescript+hyderabad&num=30';
    await page.goto(googleUrl, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForTimeout(2000);
    
    const links = await page.$$eval('a', anchors => 
      anchors
        .map(a => ({ title: a.innerText?.trim(), href: a.href }))
        .filter(a => a.href && a.href.includes('naukri.com/job-listings-'))
    );
    console.log(`Method 2 found ${links.length} live real Naukri job listing URLs from Google!`);
    if (links.length > 0) {
      console.log('Sample real Naukri job link:', links[0]);
    }
    await browser.close();
  } catch (e: any) {
    console.log('Method 2 error:', e.message);
  }
}

testMethods().catch(console.error);
