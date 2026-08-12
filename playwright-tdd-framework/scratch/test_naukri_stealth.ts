import { chromium, firefox, webkit } from '@playwright/test';

async function testBrowsers() {
  console.log('--- Testing Firefox ---');
  try {
    const b = await firefox.launch({ headless: true });
    const p = await b.newPage();
    await p.goto('https://www.naukri.com/sdet-jobs-in-hyderabad', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await p.waitForTimeout(3000);
    console.log('Firefox Title:', await p.title());
    const count = (await p.$$('.srp-jobtuple-wrapper, article.jobTuple, div.tuple, div.cust-job-tuple')).length;
    console.log('Firefox Job Cards:', count);
    
    // Check title links
    const links = await p.$$eval('a.title, a.job-title, a[href*="job-listings"]', anchors =>
      anchors.map(a => ({ text: a.innerText?.trim(), href: a.href }))
    );
    console.log('Firefox Links count:', links.length);
    if (links.length > 0) {
      console.log('Sample Firefox Link:', links[0]);
    }
    await b.close();
  } catch (e: any) {
    console.log('Firefox error:', e.message);
  }

  console.log('\n--- Testing Webkit ---');
  try {
    const b = await webkit.launch({ headless: true });
    const p = await b.newPage();
    await p.goto('https://www.naukri.com/sdet-jobs-in-hyderabad', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await p.waitForTimeout(3000);
    console.log('Webkit Title:', await p.title());
    const count = (await p.$$('.srp-jobtuple-wrapper, article.jobTuple, div.tuple, div.cust-job-tuple')).length;
    console.log('Webkit Job Cards:', count);
    const links = await p.$$eval('a.title, a.job-title, a[href*="job-listings"]', anchors =>
      anchors.map(a => ({ text: a.innerText?.trim(), href: a.href }))
    );
    console.log('Webkit Links count:', links.length);
    if (links.length > 0) {
      console.log('Sample Webkit Link:', links[0]);
    }
    await b.close();
  } catch (e: any) {
    console.log('Webkit error:', e.message);
  }
}

testBrowsers().catch(console.error);
