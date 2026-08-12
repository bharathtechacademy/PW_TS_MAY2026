import { firefox } from '@playwright/test';

async function testFirefoxSelectors() {
  console.log('Launching Firefox...');
  const browser = await firefox.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const url = 'https://www.naukri.com/sdet-jobs-in-hyderabad';
  console.log('Navigating to:', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(3000);

  console.log('Page Title:', await page.title());

  // Scroll down to load jobs
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(2000);

  // Print body text snippet or HTML structure
  const html = await page.content();
  console.log('Page HTML length:', html.length);

  // Find all <a> tags with job listing URLs
  const jobLinks = await page.$$eval('a', anchors => 
    anchors
      .map(a => ({
        text: a.innerText?.trim(),
        href: a.href,
        class: a.className
      }))
      .filter(a => a.href && (a.href.includes('/job-listings-') || a.href.includes('/job-description/')))
  );

  console.log(`Found ${jobLinks.length} real job listing links!`);
  if (jobLinks.length > 0) {
    console.log('Sample Job Links:');
    jobLinks.slice(0, 5).forEach((link, idx) => {
      console.log(`  ${idx + 1}. [${link.text}] -> ${link.href}`);
    });
  }

  // Also check article or tuple containers
  const containerClasses = [
    'cust-job-tuple',
    'srp-jobtuple-wrapper',
    'jobTuple',
    'tuple',
    'row1',
    'title'
  ];

  for (const c of containerClasses) {
    const els = await page.$$(`.${c}`);
    console.log(`Class .${c}: found ${els.length} elements`);
  }

  await browser.close();
}

testFirefoxSelectors().catch(console.error);
