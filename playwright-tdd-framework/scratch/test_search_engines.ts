import { chromium } from '@playwright/test';

async function testSearchEngines() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
  });
  const page = await context.newPage();

  // Test DuckDuckGo HTML search for real live Naukri job listings
  console.log('--- Testing DuckDuckGo for live Naukri job listings ---');
  const queries = [
    'site:naukri.com/job-listings "Playwright" "Hyderabad"',
    'site:naukri.com/job-listings "SDET" "Hyderabad"',
    'site:naukri.com/job-listings "QA Automation" "Hyderabad"',
    'site:naukri.com/job-listings "Quality Analyst" "Hyderabad"',
    'site:naukri.com/job-listings "Software Tester" "Hyderabad"'
  ];

  for (const q of queries) {
    const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`;
    await page.goto(ddgUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
    await page.waitForTimeout(1000);

    const links = await page.$$eval('a.result__url, a.result__a', anchors =>
      anchors
        .map(a => ({ title: a.innerText?.trim(), href: a.href }))
        .filter(a => a.href && a.href.includes('naukri.com/job-listings-'))
    );

    console.log(`Query "${q}": found ${links.length} real Naukri job listing links.`);
    if (links.length > 0) {
      console.log('Sample:', links[0]);
    }
  }

  // Test Bing search for live Naukri job listings
  console.log('\n--- Testing Bing for live Naukri job listings ---');
  const bingUrl = `https://www.bing.com/search?q=${encodeURIComponent('site:naukri.com/job-listings SDET Hyderabad')}&count=50`;
  await page.goto(bingUrl, { waitUntil: 'domcontentloaded', timeout: 15000 });
  await page.waitForTimeout(1000);

  const bingLinks = await page.$$eval('a', anchors =>
    anchors
      .map(a => ({ title: a.innerText?.trim(), href: a.href }))
      .filter(a => a.href && a.href.includes('naukri.com/job-listings-'))
  );

  console.log(`Bing query: found ${bingLinks.length} real Naukri job listing links.`);
  if (bingLinks.length > 0) {
    console.log('Sample Bing link:', bingLinks[0]);
  }

  await browser.close();
}

testSearchEngines().catch(console.error);
