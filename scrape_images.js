import fs from 'fs';
import https from 'https';
import http from 'http';

const jsonPath = 'D:\\react-js\\travel\\src\\lib\\Packages.json';
let packagesData = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      // Handle redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
         return fetchHtml(res.headers.location.startsWith('http') ? res.headers.location : new URL(res.headers.location, url).href).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(5000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function extractOgImage(html, baseUrl) {
  const match = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i) ||
                html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["'][^>]*>/i);
  if (match && match[1]) {
    let img = match[1];
    if (img.startsWith('/')) img = new URL(img, baseUrl).href;
    return img;
  }
  // Fallback to first large-ish img tag
  const imgMatch = html.match(/<img[^>]*src=["'](https:\/\/[^"']+\.(?:jpg|png|jpeg|webp))["']/i);
  if (imgMatch && imgMatch[1]) return imgMatch[1];
  return null;
}

async function run() {
  console.log('Starting to fix webpage URLs to direct image URLs...');
  let updatedCount = 0;
  
  for (let p of packagesData) {
    if (!p.heroImage) continue;
    
    // Check if it looks like a web page rather than an image
    if (!p.heroImage.match(/\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i)) {
      try {
        const html = await fetchHtml(p.heroImage);
        const img = extractOgImage(html, p.heroImage);
        if (img) {
          console.log(`Fixed hero: ${p.heroImage} -> ${img}`);
          p.heroImage = img;
          updatedCount++;
        }
      } catch (err) {
        console.log(`Failed to fetch ${p.heroImage}: ${err.message}`);
      }
    }
    
    if (p.itinerary) {
      for (let day of p.itinerary) {
        if (!day.image || day.image.match(/\.(jpg|jpeg|png|webp|gif|svg)(\?.*)?$/i)) continue;
        try {
          const html = await fetchHtml(day.image);
          const img = extractOgImage(html, day.image);
          if (img) {
             day.image = img;
             updatedCount++;
          }
        } catch (err) {}
      }
    }
  }
  
  if (updatedCount > 0) {
    fs.writeFileSync(jsonPath, JSON.stringify(packagesData, null, 2), 'utf-8');
    console.log(`Successfully fixed ${updatedCount} URLs to point to direct images.`);
  } else {
    console.log('No URLs could be fixed or all were already images.');
  }
}

run();
