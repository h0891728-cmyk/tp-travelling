const fs = require('fs');
const path = require('path');

// ─── 1. Fix PackageDetails.tsx – Replace "Book This Trip Now" button ───
const pdPath = path.join(__dirname, 'src/pages/PackageDetails.tsx');
let pd = fs.readFileSync(pdPath, 'utf8');

const oldButton = `                <button className="w-full bg-[#61c5a8] text-white py-5 rounded-2xl font-black text-xl hover:bg-[#4ea88f] transition-all active:scale-[0.98]">
                  Book This Trip Now
                </button>`;

const newButtons = `                <div className="space-y-3 mt-2">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full flex items-center justify-center gap-2.5 border-2 border-[#61c5a8] text-[#61c5a8] hover:bg-[#61c5a8] hover:text-white py-4 rounded-2xl font-black text-base transition-all active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5" /> Download Itinerary (PDF)
                  </button>
                  <a
                    href={\`https://wa.me/\${WA_NUMBER}?text=\${encodeURIComponent(\`Hi! I'm interested in the \${pkg.title} package. Please share availability and booking details.\`)}\`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white py-4 rounded-2xl font-black text-base transition-all active:scale-[0.98] shadow-lg shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-5 h-5" /> Book on WhatsApp
                  </a>
                </div>`;

if (pd.includes(oldButton.trim())) {
  pd = pd.replace(oldButton, newButtons);
  fs.writeFileSync(pdPath, pd, 'utf8');
  console.log('✅ PackageDetails button fixed');
} else {
  // Try regex approach
  const btnRegex = /[ \t]*<button className="w-full bg-\[#61c5a8\] text-white py-5[^"]*">\s*Book This Trip Now\s*<\/button>/;
  if (btnRegex.test(pd)) {
    pd = pd.replace(btnRegex, newButtons);
    fs.writeFileSync(pdPath, pd, 'utf8');
    console.log('✅ PackageDetails button fixed via regex');
  } else {
    console.log('❌ Button pattern not found - searching for "Book This Trip"...');
    const idx = pd.indexOf('Book This Trip');
    if (idx !== -1) {
      console.log('Found at index:', idx);
      console.log('Context:', pd.substring(idx - 150, idx + 100));
    }
  }
}

// ─── 2. Fix Packages.json – Better stories, images, itinerary ───
const pkgPath = path.join(__dirname, 'src/lib/Packages.json');
let packages = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Good working images by category
const pilgrimageImages = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Kedarnath_Temple_2.jpg/1280px-Kedarnath_Temple_2.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Badrinath_Temple_2013.jpg/1280px-Badrinath_Temple_2013.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Gangotri_Temple.jpg/1280px-Gangotri_Temple.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Yamunotri_Temple.jpg/1280px-Yamunotri_Temple.jpg',
];

const himalayaImages = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1280&q=80',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1280&q=80',
  'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=1280&q=80',
  'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=1280&q=80',
  'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1280&q=80',
];

const trekkingImages = [
  'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1280&q=80',
  'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1280&q=80',
  'https://images.unsplash.com/photo-1593614202011-48f78b1b5a31?w=1280&q=80',
  'https://images.unsplash.com/photo-1570481582319-37b0778f5bff?w=1280&q=80',
];

const leisureImages = [
  'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1280&q=80',
  'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=1280&q=80',
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1280&q=80',
];

// Map of itinerary image fixes by day key words
const goodItineraryImages = {
  shimla: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80',
  delhi: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=800&q=80',
  manali: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  kasol: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
  spiti: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  kaza: 'https://images.unsplash.com/photo-1593614202011-48f78b1b5a31?w=800&q=80',
  kedarnath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Kedarnath_Temple_2.jpg/800px-Kedarnath_Temple_2.jpg',
  badrinath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Badrinath_Temple_2013.jpg/800px-Badrinath_Temple_2013.jpg',
  gangotri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Gangotri_Temple.jpg/800px-Gangotri_Temple.jpg',
  yamunotri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Yamunotri_Temple.jpg/800px-Yamunotri_Temple.jpg',
  rishikesh: 'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=800&q=80',
  kashmir: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
  gulmarg: 'https://images.unsplash.com/photo-1576487248805-cf45f6bcc67f?w=800&q=80',
  pahalgam: 'https://images.unsplash.com/photo-1618909411890-b5c9b7e40ca8?w=800&q=80',
  jaisalmer: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800&q=80',
  udaipur: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=800&q=80',
  jibhi: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
  trek: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
  camp: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
  lake: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80',
  valley: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  pass: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80',
  meadow: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
  chopta: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80',
  triund: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
  mcleodganj: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
};

// Better stories for thin packages
const betterStories = {
  'spiti-valley': "From the apple orchards of Sangla to the lunar moonscapes of Kaza, Summer Spiti is a geological wonder frozen in rock and ice. This 7-day expedition takes you along the precipitous Hindustan-Tibet Highway, past ancient Tibetan Buddhist monasteries perched on impossible cliffs, through villages where time stands still. Experience the world's highest post office at Hikkim, the highest motorable village Komic, and the legendary Chitkul — the last inhabited village on the Indo-Tibetan border.",
  'yulla-kanda': "Yulla Kanda is one of Himachal Pradesh's best-kept secrets — a sacred mountain near Shimla adorned with a stunning Shri Krishna temple at over 11,000 feet. The trail weaves through dense oak and rhododendron forests, streams, and blooming alpine meadows. A perfect blend of spirituality, photography, and Himalayan adventure for weekenders.",
  'jibhi-tirthan': "Hidden in the folds of the Great Himalayan National Park, Jibhi and Tirthan Valley are Himachal Pradesh's best-kept secret. Ancient wooden temples, trout-filled rivers, and forested trails draw those who seek solace away from tourist rush. This 3-day escape covers cascading waterfalls, Jalori Pass views, and the serene Serolsar Lake — a true offbeat Himalayan retreat.",
  'jaisalmer': "Where the Thar Desert meets the magnificence of medieval architecture — Jaisalmer is India's Golden City, rising from the sands like a mirage. This 3-day desert escape includes the iconic Sam Sand Dunes with camel rides at sunset, the breathtaking Jaisalmer Fort (a UNESCO World Heritage Site), ornate Havelis, and a magical night under the stars in a desert camp.",
  'udaipur': "The Venice of the East, Udaipur is a city of lakes, palaces, and unmatched Rajasthani grandeur. Set against the backdrop of the Aravalli Hills, this romantic city enchants with its shimmering Lake Pichola, the magnificent City Palace complex, and colorful bazaars. A 3-day sojourn here feels like stepping into the pages of a royal fairy tale.",
  'chopta-tungnath': "Called the 'Mini Switzerland of India', the Chopta-Tungnath trail is one of Uttarakhand's most rewarding short treks. At 3,680 metres, Tungnath is the highest Shiva temple in the world, and the trek from Chopta's meadows passes through rhododendron forests blooming scarlet in spring. An optional extension to Chandrashila summit at 4,000m offers a sweeping 360° panorama of Nanda Devi, Kedarnath, and Trishul.",
  'mcleodganj-triund': "The seat of the Dalai Lama and the spiritual heart of Tibetan Buddhism in exile, McLeodganj is a town that quietly stirs the soul. The Triund trek from here ascends 2,850m along the Dhauladhar ridge, rewarding trekkers with dramatic views of the Kangra Valley stretching to the horizon. Camp under a star-strewn sky, explore Buddhist monasteries, and immerse in Tibetan culture.",
  'valley-of-flowers': "Declared a UNESCO World Heritage Site, the Valley of Flowers in Chamoli, Uttarakhand explodes into a kaleidoscope of colour between July and September. Over 500 species of wildflowers — blue poppies, asters, primulas, and orchids — carpet the valley floor at 3,658m. Combined with the sacred Hemkund Sahib Gurudwara at 4,329m, this trek is one of India's most transcendent journeys.",
  'sar-pass-trek': "One of YHAI's most legendary circuits, the Sar Pass trek in the Kullu Himalayas takes you through dense forests and open meadows, across snow bridges, and up to a breathtaking high mountain pass at 13,800 feet. Named after the pristine Sar Lake near the summit, this moderate-to-difficult trek is a rite of passage for Himalayan trekkers.",
  'kareri-lake-trek': "A pristine glacial lake nestled at 2,934m in the foothills of the Dhauladhar range, Kareri Lake is a hidden gem near Dharamshala that few travellers discover. The short but stunning trek passes through oak and pine forests, crossing streams fed by snowmelt, to emerge at a crystalline alpine lake reflecting the snow-draped Dhauladhar peaks above.",
  'parashar-lake-trek': "Set at 2,730m in the Mandi district of Himachal Pradesh, Parashar Lake is one of the most mystical sights in the Himalayas — a dark, still lake with a floating island that mysteriously shifts position year to year. The trek up is short but thrilling, rewarding you with jaw-dropping views of Dhauladhar, Pir Panjal, and the Great Himalayan ranges.",
  'har-ki-dun-trek': "Translated as the 'Valley of Gods', Har Ki Dun is a glacially carved cradle valley in Uttarkashi that holds ancient villages, Norse-mythology connections, and alpine meadows ringed by 6000m peaks. The trek follows the Tons River through pine and oak forests to the base of the Swargarohini range — the mythical stairway to heaven described in the Mahabharata.",
  'hampta-pass-trek': "The Hampta Pass trek is one of the most dramatic crossings in the Indian Himalayas — transitioning from the lush green Kullu Valley on one side to the barren, arid moonscapes of Lahaul Valley on the other, all in a single day. Camping beside glacial lakes, crossing snow bridges over roaring streams, and topping out at 14,100 feet makes this a truly epic Himalayan adventure.",
  'bhrigu-lake-trek': "Perched at 14,100 feet above Manali, Bhrigu Lake is steeped in myth — it is said the ancient sage Bhrigu meditated here and that the lake never completely freezes despite temperatures far below zero. The trek requires no technical expertise but rewards handsomely with meadows of wildflowers and a surreal lake reflecting the Dhauladhar peaks.",
  'brahmatal-trek': "The Brahmatal trek in Chamoli, Uttarakhand is a winter trekker's dream — a journey through frozen forests and snow-covered meadows to a high-altitude lake that reflects Mt. Trishul and Nanda Ghunti. Named after the sage Brahma who is believed to have meditated here, the trail passes frozen lake meadows and ghost-quiet pine forests in magical winter silence.",
  'nag-tibba-trek': "The highest peak in the Tehri-Garhwal region at 3,022m, Nag Tibba is the perfect introductory Himalayan weekend trek from Delhi. The forested trail climbs through rhododendron and oak to open ridges with sweeping views of Bandarpunch, Kedarnath, Gangotri, and Chaukhamba peaks. Simple, stunning, and deeply rewarding for first-time Himalayan trekkers.",
  'gaumukh-tapovan-trek': "At the source of the River Ganga lies Gaumukh — the 'Cow's Mouth' glacier terminus that gives birth to the holy Bhagirathi river. Beyond it lies Tapovan, a flowering meadow at 4,463m encircled by some of the most dramatic peaks in the Gangotri Group, including Shivling (6,543m), Meru (6,660m), and Bhagirathi Peaks. This trek is both a geological wonder and a profound spiritual pilgrimage.",
  'beas-kund-trek': "Hidden at the foot of the Solang Nala near Manali, Beas Kund is the glacial source of the mighty Beas River — a sacred site and stunning alpine lake at 3,700m. The trail from Dhundi camp follows a glacier-carved valley through rocky moraines and snowfields, offering close-up views of Friendship Peak, Lady of Keylong, and Hanuman Tibba.",
  'bunbuni-pass-trek': "The Bunbuni Pass trek in Parvati Valley connects the popular Kheerganga trail to the remote Kalgha meadow viewpoint. A short but exhilarating high-pass crossing at 3,800m, the trail offers solitude, forest walks through silver firs, and panoramic Himalayan ridge views rarely seen by mainstream trekkers.",
  'manali-and-kasol': "This back-to-back mountain town combo packs twin personalities into one trip — Manali's adventure and snow culture paired with Kasol's laid-back riverside vibe. From the Rohtang Pass snowfields and Sissu waterfalls to the pine-shaded banks of the Parvati River and the quirky cafés of Kasol, this is Himachal Pradesh's most celebrated backpacker circuit.",
  'bali-pass-trek': "One of the most technically demanding trails in Uttarkashi, the Bali Pass trek crosses a high mountain pass connecting the Har Ki Dun Valley to Yamunotri — two of the Garhwal Himalaya's most sacred regions. The trail traverses some of the most remote and scenic terrain in the Indian Himalayas, including the sacred Ruinsara Tal glacial lake and the rarely trekked upper reaches of the Tons Valley.",
  'buran-ghati-trek': "The Buran Ghati Pass at 15,000 feet is famous for its exhilarating rappel descent on the far side — a near-vertical snow wall that must be descended by rope. The route from Shimla traverses the enchanting Chandranahan Lake surrounded by colossal peaks, through beautiful meadows of Litham and Dayara before the adrenaline-pumping crossing that makes this trek truly legendary.",
};

// Better itinerary descriptions for spiti-valley (most prominent thin one)
const spitiItinerary = [
  { day: "Day 0", title: "Delhi to Shimla (Overnight Bus)", desc: "Board your Volvo AC bus from Kashmiri Gate, Delhi in the evening. Start the overnight journey through Karnal and Ambala toward the hills of Shimla. Arrive early morning." },
  { day: "Day 1", title: "Shimla to Sangla (Kinnaur)", desc: "Freshen up in Shimla and drive toward Kinnaur, crossing Kufri pine forests and Narkanda apple orchards. Pass through the dramatic Kinnaur Gate arch. Descend to the Baspa River valley and check into your hotel in Sangla with views of the Kinner Kailash range." },
  { day: "Day 2", title: "Chitkul, Nako & Tabo", desc: "Morning drive to Chitkul — the last inhabited village on the Indo-China border and the source of the Baspa River. Return to Karcham and ascend steeply to Nako, a remote village perched around a sacred frozen lake. Visit the 1000-year-old monastery and continue to Tabo for the night." },
  { day: "Day 3", title: "Tabo to Kaza (via Dhankar)", desc: "Explore the cave monasteries and ancient murals of Tabo (one of the oldest monasteries in the world). Drive to precariously perched Dhankar Monastery overlooking the confluence of the Spiti and Pin rivers. Continue to Kaza, the district headquarters of Spiti, and set up base." },
  { day: "Day 4", title: "Key Monastery & Chicham Bridge", desc: "Visit the iconic Key Monastery (Ki Gompa) — an 11th-century fortress-monastery dramatically perched on a rocky hill. Drive through Kibber (the world's highest motorable village) and cross the Chicham Bridge — the highest suspension bridge in Asia at 4,450m, spanning a 120m gorge." },
  { day: "Day 5", title: "Hikkim, Komic, Langza", desc: "Begin the day at Hikkim and send a postcard from the world's highest post office at 14,400 feet. Drive to Komic — the highest motorable village on earth — and then to Langza, the Fossil Village, where you'll find a towering Buddha statue surrounded by marine fossils from when the Himalayas were an ancient seabed." },
  { day: "Day 6", title: "Kaza to Kalpa", desc: "Depart Kaza and drive back through Kinnaur. Stop at the enchanting Nako Lake and pick up local handicrafts. Reach Kalpa by evening and check into your hotel. Watch Kinner Kailash peak turn golden at sunset from your window." },
  { day: "Day 7", title: "Kalpa – Suicide Point – Shimla – Delhi", desc: "Early morning visit to the aptly named Suicide Point in Kalpa, where the cliff edge offers a terrifying and breathtaking view of the gorge below. Drive back to Shimla, stop for lunch, and depart for Delhi on the evening Volvo bus, carrying unforgettable memories." }
];

const manaliKasolItinerary = [
  { day: "Day 0", title: "Delhi to Manali (Overnight Bus)", desc: "Depart from Delhi in the evening aboard a Volvo AC bus. Overnight journey through Chandigarh and the lower hills." },
  { day: "Day 1", title: "Reach Manali – Hotel Check-in", desc: "Arrive in Manali by morning. Freshen up and check into your hotel. Evening stroll on Mall Road, visit Hadimba Devi Temple and the old Manu Temple. Dinner and overnight stay." },
  { day: "Day 2", title: "Sissu, Rohtang Pass & Snow Point", desc: "Drive through the Atal Tunnel to Sissu — a pristine meadow with waterfalls and mountain views on the other side of the Rohtang Pass. Visit Atal Setu and proceed to the Rohtang Snow Point for snow play and panoramic Himalayan views. Return to Manali." },
  { day: "Day 3", title: "Manali to Kasol", desc: "After breakfast, depart for Kasol via Kullu and the Beas Valley. Arrive in Kasol — the tiny backpacker village on the Parvati River — and check into your camp or guesthouse. Evening walk along the river. Try Israeli café food, a Kasol signature." },
  { day: "Day 4", title: "Kheerganga Trek (Optional) or Leisure at Kasol", desc: "Optional full-day trek to Kheerganga — 12km through dense forests to a natural hot spring meadow at 2,960m. Non-trekkers can explore Manikaran Sahib Gurudwara (famous for its hot spring langar), local markets, and riverside cafés." },
];

const choptaTungnathItinerary = [
  { day: "Day 0", title: "Delhi to Haridwar (Overnight Bus)", desc: "Board your overnight Volvo bus from Delhi toward Haridwar. Arrive early morning and freshen up." },
  { day: "Day 1", title: "Haridwar to Chopta (via Devprayag)", desc: "Drive from Haridwar through the Garhwal foothills, passing the sacred Devprayag Sangam (confluence of Alaknanda and Bhagirathi). Continue ascending through rhododendron forests to Chopta (2,680m). Check into camps or guesthouses and acclimatize." },
  { day: "Day 2", title: "Tungnath Trek + Chandrashila Summit", desc: "Early morning 4km trek to Tungnath — the world's highest Shiva temple at 3,680m. Snow-covered and serene, the temple is part of the Panch Kedar circuit. Continue 1.5km further to Chandrashila Summit (4,000m) for a sweeping 360° view of Nanda Devi, Kedarnath, Trishul, and Chaukhamba. Descend back to Chopta." },
  { day: "Day 3", title: "Chopta to Deoria Tal & Ukhimath", desc: "Morning drive to Sari village and trek 2.5km to the magical Deoria Tal lake (2,438m) — a mirror-like alpine lake perfectly reflecting the snow peaks of the Chaukhamba massif. Return to Sari and drive to Ukhimath for night stay." },
];

// Apply better stories
let updatedCount = 0;
packages = packages.map(pkg => {
  if (betterStories[pkg.id]) {
    pkg.story = betterStories[pkg.id];
    updatedCount++;
  }
  
  // Fix specific itineraries
  if (pkg.id === 'spiti-valley') {
    pkg.itinerary = spitiItinerary.map((day, i) => ({
      ...day,
      image: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
        'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80',
        'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=800&q=80',
        'https://images.unsplash.com/photo-1593614202011-48f78b1b5a31?w=800&q=80',
        'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80',
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
        'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80',
      ][i] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'
    }));
  }
  
  if (pkg.id === 'manali-and-kasol') {
    pkg.itinerary = manaliKasolItinerary.map((day, i) => ({
      ...day,
      image: [
        'https://images.unsplash.com/photo-1558431382-27e303142255?w=800&q=80',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
        'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
        'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
        'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
      ][i] || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
    }));
  }
  
  if (pkg.id === 'chopta-tungnath') {
    pkg.itinerary = choptaTungnathItinerary.map((day, i) => ({
      ...day,
      image: [
        'https://images.unsplash.com/photo-1615460549969-36fa19521a4f?w=800&q=80',
        'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
        'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80',
      ][i] || 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=800&q=80'
    }));
  }
  
  // Fix all generic itinerary descriptions ("Enjoy the journey to X...")
  if (pkg.itinerary) {
    pkg.itinerary = pkg.itinerary.map(day => {
      if (day.desc && day.desc.startsWith('Enjoy the journey to')) {
        const location = day.title ? day.title.replace(/^(Reach|Departure from|Arrive at)\s*/i, '') : 'the destination';
        day.desc = `Begin your journey to ${location}. The drive winds through spectacular Himalayan scenery with opportunities to stop at viewpoints. Settle in and explore the local surroundings as the evening draws in.`;
      }
      
      // Fix bad itinerary images (placeholder/404 urls from lonelyplanet etc)
      const badImagePatterns = [
        'lonelyplanet.com/images/',
        'tripadvisor.com/LocationPhotoDirectLink',
        'www.outlooktraveller.com/wp-content/uploads/2023/11/bunbuni',
        'www.lonelyplanet.com/images/bunbuni',
        'www.lonelyplanet.com/images/shrikhand',
        'www.lonelyplanet.com/images/kedarnath',
        'www.lonelyplanet.com/images/chandrashila',
      ];
      
      const isBadImage = badImagePatterns.some(p => day.image && day.image.includes(p.split('/')[0]) && day.image.includes(p.split('/')[1] || p));
      if (isBadImage || !day.image || day.image.length < 20) {
        // Pick image based on title keywords
        const titleLower = (day.title || '').toLowerCase();
        const descLower = (day.desc || '').toLowerCase();
        const combined = titleLower + descLower;
        
        let bestImage = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
        for (const [keyword, url] of Object.entries(goodItineraryImages)) {
          if (combined.includes(keyword)) {
            bestImage = url;
            break;
          }
        }
        day.image = bestImage;
      }
      
      return day;
    });
  }
  
  // Limit highlights to max 6
  if (pkg.highlights && pkg.highlights.length > 6) {
    pkg.highlights = pkg.highlights.slice(0, 6);
  }
  
  // Fix heroImage if it's a known bad URL (relative or short)
  if (!pkg.heroImage || pkg.heroImage.length < 30 || pkg.heroImage.includes('placeholder')) {
    const catImages = {
      'Pilgrimage': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Kedarnath_Temple_2.jpg/1280px-Kedarnath_Temple_2.jpg',
      'Pilgrimage & Trekking': 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1280&q=80',
      'Trekking': 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1280&q=80',
      'Expedition': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&q=80',
      'Backpacking & Leisure': 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1280&q=80',
    };
    pkg.heroImage = catImages[pkg.category] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&q=80';
  }
  
  return pkg;
});

fs.writeFileSync(pkgPath, JSON.stringify(packages, null, 2), 'utf8');
console.log(`✅ Packages.json updated — ${updatedCount} stories improved, itineraries fixed, bad images replaced`);
console.log(`✅ Total packages: ${packages.length}`);
