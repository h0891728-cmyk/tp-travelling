const fs = require('fs');
const path = require('path');

// ─── Parse CSV ───────────────────────────────────────────
const csvRaw = fs.readFileSync(path.join(__dirname, 'src/lib/images-link.csv'), 'utf8');
const csvLines = csvRaw.trim().split('\n').slice(1); // skip header

// Group images by folder
const folderImages = {};
for (const line of csvLines) {
  const parts = line.split(',');
  if (parts.length < 5) continue;
  const folder = parts[0].trim();
  const w = parseInt(parts[2]) || 0;
  const h = parseInt(parts[3]) || 0;
  const url = parts[4].trim();
  if (!folderImages[folder]) folderImages[folder] = [];
  folderImages[folder].push({ url, w, h, ratio: w / (h || 1) });
}

// Helper: get best landscape hero image (widest ratio, min width 700)
const getHero = (folder) => {
  const imgs = folderImages[folder];
  if (!imgs || imgs.length === 0) return null;
  // prefer landscape (ratio > 1), min width 700, sort by width desc
  const landscape = imgs
    .filter(i => i.ratio >= 1.2 && i.w >= 600)
    .sort((a, b) => b.w - a.w);
  if (landscape.length > 0) return landscape[0].url;
  // fallback: widest available
  return imgs.sort((a, b) => b.w - a.w)[0].url;
};

// Helper: get itinerary images (rotate through folder, skip hero)
const getItineraryImages = (folder, count) => {
  const imgs = folderImages[folder];
  if (!imgs || imgs.length === 0) return [];
  // prefer landscape or square, skip thumbnail-sized
  const usable = imgs.filter(i => i.w >= 400).sort((a, b) => b.w - a.w);
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(usable[i % usable.length]?.url || imgs[0].url);
  }
  return result;
};

// ─── Map: package id → CSV folder ────────────────────────
// Covers all folders in the CSV
const PKG_FOLDER_MAP = {
  'char-dham':         'CharDhamTP',
  'do-dham':           'DoDhamTP',
  'kedarnath-expedition': 'KedarnathTP',
  'kinnaur-kailash':   'KINNAURKAILASH',
  'kinner-kailash':    'KINNAURKAILASH',
  'manimahesh-kailash':'MANIMAHESH',
  'shrikhand-mahadev': 'SHRIKHANDMAHADEV',
  'winter-kashmir':    'WINTERKASHMIR',
  'winter-spiti':      'WINTERSPITITP',
  'spiti-valley':      'WINTERSPITITP',  // use winter spiti images for summer too
  'yulla-kanda':       'YULLA-KANDA',
  'jibhi-tirthan':     'Jibhi',
  'jaisalmer':         'Jaisalmer',
  'chopta-tungnath':   'TUNGNATH',
  'nag-tibba-trek':    'NAG',
  'sar-pass-trek':     'SAR-PASS',
  'kareri-lake-trek':  'KARERI-LAKE',
  'manali-and-kasol':  'MANALI',
  'kuari-pass-trek':   'KUARI-PASS',
  'raulane-festival':  'RAULANE-FESTIVAL',
  'sangla-holi':       'SANGLA-HOLI',
};

// Folders with dedicated hero posters (file 0.jpg is portrait poster; prefer landscape)
const POSTER_FOLDERS = ['CharDhamTP','DoDhamTP','KedarnathTP','KINNAURKAILASH','MANIMAHESH','SHRIKHANDMAHADEV','WINTERKASHMIR','WINTERSPITITP'];

// ─── Load packages ────────────────────────────────────────
const pkgPath = path.join(__dirname, 'src/lib/Packages.json');
let packages = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

let heroUpdated = 0, itineraryUpdated = 0;

packages = packages.map(pkg => {
  const folder = PKG_FOLDER_MAP[pkg.id];
  if (!folder || !folderImages[folder]) {
    return pkg; // no CSV images for this package
  }

  // ─ Hero Image ─
  const hero = getHero(folder);
  if (hero) {
    pkg.heroImage = hero;
    heroUpdated++;
  }

  // ─ Itinerary Images ─
  if (pkg.itinerary && pkg.itinerary.length > 0) {
    const itImgs = getItineraryImages(folder, pkg.itinerary.length);
    pkg.itinerary = pkg.itinerary.map((day, i) => ({
      ...day,
      image: itImgs[i] || day.image
    }));
    itineraryUpdated++;
  }

  return pkg;
});

fs.writeFileSync(pkgPath, JSON.stringify(packages, null, 2), 'utf8');

console.log(`✅ Done!`);
console.log(`   Hero images updated: ${heroUpdated} packages`);
console.log(`   Itinerary images updated: ${itineraryUpdated} packages`);
console.log(`\n📂 Folder → Package mapping used:`);
for (const [id, folder] of Object.entries(PKG_FOLDER_MAP)) {
  const hasFolder = !!folderImages[folder];
  console.log(`   ${hasFolder ? '✓' : '✗'} ${id.padEnd(25)} ← ${folder}`);
}
console.log(`\n📂 All CSV folders available:`);
for (const [folder, imgs] of Object.entries(folderImages)) {
  console.log(`   ${folder.padEnd(25)} (${imgs.length} images)`);
}
