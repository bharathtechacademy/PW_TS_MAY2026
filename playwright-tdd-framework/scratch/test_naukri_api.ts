import { chromium } from '@playwright/test';

async function testApi() {
  console.log('Testing Naukri public API & web requests...');

  // Try API request via fetch with browser headers
  const browser = await chromium.launch({
    headless: false, // test headed or realistic context
    args: [
      '--disable-blink-features=AutomationControlled',
      '--no-sandbox'
    ]
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    viewport: { width: 1440, height: 900 },
    extraHTTPHeaders: {
      'appid': '109',
      'systemid': 'Naukri',
      'Accept': 'application/json',
      'Client-Id': 'd754117a7833418e'
    }
  });

  const page = await context.newPage();

  // First visit homepage to get cookies
  console.log('Visiting naukri.com home...');
  try {
    await page.goto('https://www.naukri.com', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(3000);
    console.log('Home title:', await page.title());
  } catch (e) {
    console.error('Home visit error:', e);
  }

  // Try searching via search bar or API call
  const apiUrl = 'https://www.naukri.com/jobapi/v3/search?noOfResults=20&urlType=search_by_keyword&searchType=adv&keyword=playwright%20typescript&location=hyderabad&seoKey=playwright-typescript-jobs-in-hyderabad&src=jobsearchHeader';
  
  const response = await page.evaluate(async (url) => {
    try {
      const res = await fetch(url, {
        headers: {
          'appid': '109',
          'systemid': 'Naukri',
          'gid': 'LOCATION,EXPERIENCE,EDUCATION',
          'Accept': 'application/json'
        }
      });
      return await res.json();
    } catch (err: any) {
      return { error: err.message };
    }
  }, apiUrl);

  console.log('API Response status/keys:', Object.keys(response || {}));
  if (response.jobDetails) {
    console.log(`Found ${response.jobDetails.length} jobs via API!`);
    console.log('Sample job:', JSON.stringify(response.jobDetails[0], null, 2));
  } else {
    console.log('API response body:', JSON.stringify(response).slice(0, 500));
  }

  await browser.close();
}

testApi().catch(console.error);
