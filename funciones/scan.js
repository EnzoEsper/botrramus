import {chromium} from "playwright";

export const scan = async (url) => {

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();
    await page.goto(url);
  
    await page.waitForTimeout(2000);

    //const loadMore = page.document.querySelector(".js-load-more")
  
      
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight * 3);
    });
      
    await page.waitForTimeout(2000);
  
    //FUNCION QUE BUSCA POR json data
    const disc = await page.evaluate(() => {
  
      const elements = document.querySelectorAll(".js-item-product");
      const disc = [];
      let cont = 0;
  
      elements.forEach((element) => {
  
        const scriptElement = element.querySelector('script[data-component="structured-data.item"]');
        cont ++;
      
      if (scriptElement) {
          try {
              const jsonData = JSON.parse(scriptElement.innerHTML);
              if (jsonData) {
                const producto = {
                orden: cont,
                nombre: jsonData.name,
                precio: jsonData.offers.price,
                linkImagen: jsonData.image
                }
                disc.push(producto); 
            }
              
          } catch (error) {
              console.error("Error al parsear el JSON:", error);
          }
      } else {
          console.error("No se encontró el script con structured-data.item en un elemento");
      }
      });
  
      return disc;
    });
  
    console.log(disc)
    await browser.close();
  };