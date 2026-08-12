import { chromium } from '@playwright/test';

async function testDom() {
  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-blink-features=AutomationControlled',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
    }
  });

  const page = await context.newPage();

  console.log('Navigating to Naukri search page...');
  const searchUrl = 'https://www.naukri.com/sdet-jobs-in-hyderabad-secunderabad';
  await page.goto(searchUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(4000);

  console.log('Page title:', await page.title());

  // Check selectors
  const selectors = [
    '.srp-jobtuple-wrapper',
    '.cust-job-tuple',
    'article.jobTuple',
    '.jobTuple',
    'div.tuple',
    'div[data-job-id]',
    'a.title'
  ];

  for (const sel of selectors) {
    const els = await page.$$(sel);
    console.log(`Selector "${sel}": found ${els.length} elements`);
  }

  // Check links on page
  const allLinks = await page.$$eval('a', anchors => 
    anchors
      .map(a => ({ title: a.innerText?.trim(), href: a.href }))
      .filter(a => a.href && a.href.includes('/job-listings-'))
  );

  console.log(`Found ${allLinks.length} job-listings links on page.`);
  if (allLinks.length > 0) {
    console.log('Sample links:', allLinks.slice(0, 5));
  }

  await browser.close();
}

testDom().catch(console.error);
