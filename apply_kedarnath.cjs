const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, 'src/lib/Packages.json');
let packages = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// KEDARNATH folder = actual trek photos → use for char-dham too (has 9 good images)
const KEDARNATH_IMGS = [
  'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/1.jpeg',
  'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/6.jpeg',
  'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/7.jpeg',
  'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/8.jpeg',
  'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/4.jpeg',
  'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/2.jpeg',
  'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/3.jpeg',
  'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/5.jpeg',
  'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/9.jpeg',
];

// Apply KEDARNATH images to do-dham and madhmaheshwar and rudranath (all Uttarakhand pilgrimage)
const KEDARNATH_PKGS = ['do-dham', 'kedarnath-expedition', 'madhmaheshwar', 'rudranath-kalpeshwar', 'adi-kailash'];

let updated = 0;
packages = packages.map(pkg => {
  if (!KEDARNATH_PKGS.includes(pkg.id)) return pkg;
  
  // Hero = best landscape from KEDARNATH
  pkg.heroImage = KEDARNATH_IMGS[0]; // 1280x960 landscape
  
  // Itinerary images
  if (pkg.itinerary) {
    pkg.itinerary = pkg.itinerary.map((day, i) => ({
      ...day,
      image: KEDARNATH_IMGS[i % KEDARNATH_IMGS.length]
    }));
  }
  updated++;
  return pkg;
});

fs.writeFileSync(pkgPath, JSON.stringify(packages, null, 2), 'utf8');
console.log(`✅ Applied KEDARNATH folder images to ${updated} additional packages`);
