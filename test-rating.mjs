import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = (name) => path.join(__dirname, name);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 900 });

// 1. Página de detalle antes de calificar
await page.goto('http://localhost:3000/course/curso-de-react', { waitUntil: 'networkidle' });
await page.screenshot({ path: OUT('01-before-rating.png'), fullPage: false });
console.log('Screenshot 1: página cargada (sin calificación)');

// 2. Hover sobre la estrella 4
const stars = page.locator('button[aria-label*="estrella"]');
await stars.nth(3).hover();
await page.screenshot({ path: OUT('02-hover-star4.png'), fullPage: false });
console.log('Screenshot 2: hover en estrella 4');

// 3. Click en estrella 4
await stars.nth(3).click();

// Esperar a que el widget muestre éxito
await page.waitForSelector('text=¡Gracias por calificar!', { timeout: 8000 });
await page.screenshot({ path: OUT('03-after-rating.png'), fullPage: false });
console.log('Screenshot 3: después de calificar con 4 estrellas');

await browser.close();
console.log('\nListo. Screenshots guardados en el escritorio del proyecto.');
