const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.perramus.com.ar/hombre");

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
