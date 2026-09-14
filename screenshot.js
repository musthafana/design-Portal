const puppeteer = require('puppeteer');

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  
  console.log("Navigating to localhost...");
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  // Wait for 3D scene to fully mount
  await new Promise(r => setTimeout(r, 2000));

  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight);

  console.log("Scrolling to 20%...");
  await page.evaluate((s) => window.scrollTo(0, s * 0.2), scrollHeight);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '/Users/musthafaabdulrahiman/.gemini/antigravity/brain/b7cfbb20-c377-4829-b137-8530feb98423/scroll-20.png' });

  console.log("Scrolling to 50%...");
  await page.evaluate((s) => window.scrollTo(0, s * 0.5), scrollHeight);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '/Users/musthafaabdulrahiman/.gemini/antigravity/brain/b7cfbb20-c377-4829-b137-8530feb98423/scroll-50.png' });

  console.log("Scrolling to 90%...");
  await page.evaluate((s) => window.scrollTo(0, s * 0.9), scrollHeight);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '/Users/musthafaabdulrahiman/.gemini/antigravity/brain/b7cfbb20-c377-4829-b137-8530feb98423/scroll-90.png' });

  await browser.close();
  console.log("Done!");
})();
