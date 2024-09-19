const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.perramus.com.ar/hombre");

  await page.waitForTimeout(2000);

  await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight * 3);
  });

  await page.waitForTimeout(2000);

  const disc = await page.evaluate(() => {
    const spans = document.querySelectorAll(
      "div.item-product div.item-image div.labels span"
    );
    const disc = [];
    spans.forEach((span) => {
      disc.push(span.textContent);
    });
    return disc;
  });

  console.log(disc);
  await browser.close();
})();
