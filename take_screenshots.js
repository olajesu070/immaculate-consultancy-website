const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const outputDir = path.resolve('C:/Users/DELL/.gemini/antigravity/brain/add66081-4fb7-4e5e-8691-1e53bc061e20');

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.goto('http://127.0.0.1:8080/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Capture Header with Top Bar in its natural position
  try {
    await page.screenshot({
      path: path.join(outputDir, 'sec_01_topbar_navbar.png'),
      clip: { x: 0, y: 0, width: 1440, height: 160 }
    });
    console.log('Saved sec_01_topbar_navbar.png');
  } catch (e) {
    console.error('Error on navbar clip:', e);
  }

  // 2. Open the mega-dropdown and take a screenshot of it in action
  try {
    await page.hover('.has-dropdown');
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({
      path: path.join(outputDir, 'sec_01b_services_dropdown.png'),
      clip: { x: 0, y: 0, width: 1440, height: 480 }
    });
    console.log('Saved sec_01b_services_dropdown.png');
    await page.mouse.move(0, 700);
    await new Promise(r => setTimeout(r, 400));
  } catch (e) {
    console.error('Error on dropdown screenshot:', e);
  }

  // Make header relative so it doesn't overlay other section element screenshots when scrolling
  await page.evaluate(() => {
    const hdr = document.querySelector('#siteHeader');
    if (hdr) hdr.style.position = 'relative';
  });

  const sections = [
    { name: '01_header_navbar', selector: '#siteHeader' },
    { name: '02_hero_slider', selector: '#home' },
    { name: '03_overlapping_boxes', selector: '#why-us' },
    { name: '04_about_section', selector: '#about' },
    { name: '05_services_section', selector: '#services' },
    { name: '06_funfact_achievements', selector: '.funfact-section' },
    { name: '07_consultants_team', selector: '#team' },
    { name: '08_portfolio_trackrecord', selector: '#portfolio' },
    { name: '09_testimonials_section', selector: '.testimonials-section' },
    { name: '10_contact_consultation', selector: '#contact' },
    { name: '11_insights_news', selector: '#news' },
    { name: '12_footer_newsletter', selector: '.site-footer' }
  ];

  // Capture individual elements
  for (const s of sections) {
    try {
      const el = await page.$(s.selector);
      if (el) {
        const filePath = path.join(outputDir, `sec_${s.name}.png`);
        await el.screenshot({ path: filePath });
        console.log(`Saved sec_${s.name}.png`);
      } else {
        console.warn(`Selector not found: ${s.selector}`);
      }
    } catch (e) {
      console.error(`Error capturing ${s.name}:`, e.message);
    }
  }

  // Restore header position for full page screenshot
  await page.evaluate(() => {
    const hdr = document.querySelector('#siteHeader');
    if (hdr) hdr.style.position = 'sticky';
  });

  // Full page overview screenshot
  try {
    await page.screenshot({
      path: path.join(outputDir, 'full_page_overview.png'),
      fullPage: true
    });
    console.log('Saved full_page_overview.png');
  } catch (e) {
    console.error('Error full page:', e.message);
  }

  await browser.close();
  console.log('All screenshots completed successfully!');
}

capture().catch(console.error);
