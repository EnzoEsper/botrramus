import { scan } from "./funciones/scan.js";


async function runScans() {
    await scan("https://www.perramus.com.ar/mujer/");
    await scan("https://www.perramus.com.ar/hombre/");
    await scan("https://www.perramus.com.ar/nino/");
  }
  
runScans();