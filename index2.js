const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://www.perramus.com.ar/mujer");

  await page.waitForTimeout(2000);

  /*await page.evaluate(() => {
    window.scrollBy(0, window.innerHeight * 3);
  });*/
  console.log("items")
  //await page.waitForTimeout(2000);

  const getData = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll("div.item-product"))
    console.log("items")
    const itemsData = [];
    Array.from(items).forEach(item => {
      console.log(item)
      //itemsData.push(item)
    })
    /*const spans = document.querySelectorAll(
      "div.item-product div.item-image div.labels span"
    );
    const dataVariants = s
    const disc = [];
    spans.forEach((span) => {
      disc.push(span.textContent);
    });*/
    return itemsData;
  });

  console.log(getData);
  await browser.close();
})();
