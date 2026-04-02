// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useMeta } from '../hooks/useMeta';
import {
  ChevronRight, ArrowRight, MapPin, Calendar, Star, Clock,
  Mountain, Heart, Users, Sparkles, Tent, Footprints,
  ShieldCheck, PhoneCall, ChevronDown, Quote, Map as MapIcon, X
} from 'lucide-react';

import packagesData from '../lib/Packages.json';

// ==================== DYNAMIC DATA ====================
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1472396961693-142e6e26ceac?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1600"
];

const DYNAMIC_SPIRITUAL = packagesData
  .filter((p: any) => {
    return p.category === 'Pilgrimage' || p.category === 'Pilgrimage & Trekking';
  })
  .slice(0, 8)
  .map((p: any, index: number) => {
    const hasValidImage = p.heroImage && p.heroImage.length > 5;
    return {
      id: p.id,
      name: p.title,
      places: p.location,
      duration: p.duration,
      price: p.price,
      originalPrice: p.originalPrice || null,
      image: hasValidImage ? p.heroImage : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]
    };
  });
const DYNAMIC_TREKKING = packagesData
  .filter((p: any) => p.category === 'Trekking' || p.category === 'Expedition')
  .slice(0, 8)
  .map((p: any) => ({
    id: p.id,
    name: p.title,
    duration: p.duration,
    difficulty: "Moderate to Challenging",
    image: p.heroImage,
    price: p.price,
    originalPrice: p.originalPrice || null,
  }));

const HERO_SLIDES = [
  { id: 1, title: "Winter Spiti Adventure", location: "Spiti Valley, Himachal", image: packagesData.find((p: any) => p.id === "winter-spiti")?.heroImage || "https://raw.githubusercontent.com/h0891728-cmyk/images/main/WINTERSPITITP/24.jpg", desc: "Snow-covered paradise at 4000m+" },
  { id: 2, title: "Char Dham Yatra", location: "Dev Bhoomi, Uttarakhand", image: packagesData.find((p: any) => p.id === "char-dham")?.heroImage || "https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/7.jpeg", desc: "The ultimate spiritual journey" },
  { id: 3, title: "Manali & Kasol", location: "Manali, Himachal", image: packagesData.find((p: any) => p.id === "manali-and-kasol")?.heroImage || "https://raw.githubusercontent.com/h0891728-cmyk/images/main/MANALI/4.jpeg", desc: "Mountains, music, and calm in air." },
  { id: 4, title: "Jibhi Tirthan", location: "Jibhi, Himachal", image: packagesData.find((p: any) => p.id === "jibhi-tirthan")?.heroImage || "https://raw.githubusercontent.com/h0891728-cmyk/images/main/Jibhi/20241231_155606(0).jpg", desc: "Hidden valleys made for slow living." }
];

const GROUP_DEPARTURES = [
  { id: 1, name: "Winter Spiti Expedition", date: "15 Jun 2026", duration: "8 Days", spots: 4, price: "₹16,000", image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/WINTERSPITITP/24.jpg", link: "/packages/winter-spiti" },
  { id: 2, name: "Char Dham Yatra", date: "01 May 2026", duration: "10 Days", spots: 6, price: "₹19,000", image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/CharDhamTP/27.jpg", link: "/packages/char-dham" },
  { id: 3, name: "Sar Pass Trek", date: "10 Jun 2026", duration: "5 Days", spots: 8, price: "₹9,500", image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/SAR-PASS/5.jpeg", link: "/packages/sar-pass-trek" },
  { id: 4, name: "Manimahesh Kailash Yatra", date: "25 Aug 2026", duration: "4 Days", spots: 5, price: "₹12,000", image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/MANIMAHESH/9.jpeg", link: "/packages/manimahesh-kailash" },
  { id: 5, name: "Shrikhand Mahadev Trek", date: "15 Jul 2026", duration: "6 Days", spots: 3, price: "₹14,000", image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/SHRIKHANDMAHADEV/17.jpg", link: "/packages/shrikhand-mahadev" },
  { id: 6, name: "Nag Tibba Weekend", date: "03 May 2026", duration: "2 Days", spots: 10, price: "₹4,500", image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/NAG/IMG_4611.jpg", link: "/packages/nag-tibba-trek" },
  { id: 7, name: "Tungnath - Chandrashila", date: "20 Apr 2026", duration: "3 Days", spots: 7, price: "₹6,000", image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/TUNGNATH/4.jpeg", link: "/packages/chopta-tungnath" },
  { id: 8, name: "Winter Kashmir Escapade", date: "05 Jan 2027", duration: "6 Days", spots: 4, price: "₹14,000", image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/WINTERKASHMIR/11.jpg", link: "/packages/winter-kashmir" },
];

const HONEYMOON_ESCAPES = [
  { id: 1, name: "Kullu Manali Romance",   vibe: "Snow & Mountain Views",   image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/MANALI/4.jpeg",           price: "₹19,000", whatsappMsg: "Hi, I want to book Manali Honeymoon package" },
  { id: 2, name: "Jibhi Tirthan Retreat",  vibe: "Forest & River Vibes",    image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/Jibhi/20241231_155606(0).jpg", price: "₹12,000", whatsappMsg: "Hi, I want to book Jibhi Tirthan Retreat package" },
  { id: 3, name: "Kashmir Houseboat Stay", vibe: "Lakes & Garden City",     image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/WINTERKASHMIR/13.jpg",    price: "₹28,000", whatsappMsg: "Hi, I want to book Kashmir Romantic package" },
  { id: 4, name: "Jaisalmer Desert Night", vibe: "Royal Desert Under Stars", image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/Jaisalmer/IMG-20251125-WA0027.jpg", price: "₹14,000", whatsappMsg: "Hi, I want to book Jaisalmer Desert package" },
];

const DESTINATIONS = packagesData.map((p: any) => ({
  id: p.id,
  name: p.title,
  category: p.id.includes('dham') ? 'Spiritual' : 'Adventure',
  state: p.location.split(',')[1] || 'Himachal Pradesh',
  price: p.price,
  rating: 4.8,
  image: p.heroImage,
  details: p.story.substring(0, 120) + "..."
}));

const STORIES = [
  {
    id: 1,
    traveler: "Arjun & Neha",
    title: "Camping under the Spiti sky",
    date: "Oct 2025",
    image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/WINTERSPITITP/23.jpg",
    excerpt: "Setting up our tent in the cold desert of Spiti at -10°C was unlike anything we'd experienced...",
    full: "We booked the Winter Spiti adventure with Travelling Partners and it changed us forever. The silence of the valley at night, the frozen river, the warmth of the homestay families — every moment felt sacred."
  },
  {
    id: 2,
    traveler: "Riya Sharma",
    title: "Solo to Manimahesh Lake",
    date: "Aug 2025",
    image: "https://raw.githubusercontent.com/h0891728-cmyk/images/main/MANIMAHESH/9.jpeg",
    excerpt: "The 14km trek to Manimahesh Lake at 13,500 feet tested every limit I thought I had...",
    full: "I'm a solo female traveller and I was nervous about joining a group. But the Travelling Partners team made me feel completely safe and included. The Mani Darshan at dawn was the most spiritual moment of my life."
  }
];

const FAQS = [
  { question: "Do you provide custom travel itineraries?", answer: "Yes, we specialize in creating 100% personalized itineraries..." },
  { question: "Are your Himalayan treks suitable for beginners?", answer: "We offer treks across all difficulty levels..." },
  { question: "What is included in the Char Dham Yatra package?", answer: "Our premium Char Dham Yatra packages include..." },
  { question: "How early should I book to get the best prices?", answer: "We recommend booking at least 2-3 months in advance..." },
];

// SectionHeader
const SectionHeader = ({ title, subtitle = "", center = false }: { title: string; subtitle?: string; center?: boolean }) => (
  <div className={`max-w-3xl mb-10 md:mb-16 ${center ? 'mx-auto text-center' : ''}`}>
    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-black tracking-tight mb-4 text-slate-900 leading-tight">
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-base md:text-lg text-slate-600 font-medium">
        {subtitle}
      </motion.p>
    )}
  </div>
);

// ==================== ADVANCED HERO ====================
const AdvancedHero = () => {
  const [active, setActive] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);

  // Hero slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Right side cards auto scroll
  useEffect(() => {
    const cardTimer = setInterval(() => {
      setCardIndex((prev) => (prev + 1) % packagesData.length);
    }, 3000);
    return () => clearInterval(cardTimer);
  }, []);

  return (
    <section className="relative h-[100dvh] min-h-[600px] w-full overflow-hidden bg-slate-950 flex flex-col">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 0.8 }, scale: { duration: 6, ease: "linear" } }}
          className="absolute inset-0 z-0"
        >
          <img src={HERO_SLIDES[active].image} alt={HERO_SLIDES[active].title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/30 to-transparent hidden md:block" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-28 md:pt-32 pb-8 flex flex-col justify-end md:justify-center">
        <div className="grid md:grid-cols-12 gap-8 items-end">
          {/* Left Text */}
          <div className="md:col-span-7">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-[#61c5a8] font-bold uppercase tracking-widest mb-3"
            >
              <MapPin className="w-5 h-5" />
              {HERO_SLIDES[active].location}
            </motion.div>
            <motion.h1
              key={`title-${active}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none mb-6 tracking-tighter"
            >
              {HERO_SLIDES[active].title}
            </motion.h1>
            <motion.p
              key={`desc-${active}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/90 max-w-md"
            >
              {HERO_SLIDES[active].desc}
            </motion.p>
          </div>

          {/* RIGHT SIDE SMALL CARDS - Auto scroll + NO SCROLLBAR */}
          <div className="hidden md:block md:col-span-5">
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none]">
              {packagesData.slice(0, 6).map((pkg: any) => (
                <Link
                  key={pkg.id}
                  to={`/packages/${pkg.id}`}
                  className="flex-shrink-0 w-52 snap-center"
                >
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden h-full"
                  >
                    <img src={pkg.heroImage} alt={pkg.title} className="w-full h-32 object-cover" />
                    <div className="p-4">
                      <p className="text-xs text-white/70 font-medium line-clamp-1">{pkg.title}</p>
                      <p className="text-[#61c5a8] font-black text-lg">{pkg.price}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

// TripCategories (EXACT SAME AS YOUR APP.TSX)
const TripCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = [
    { name: 'Spiritual Yatras', id: 'spiritual', icon: Sparkles, count: `${DYNAMIC_SPIRITUAL.length}+ Packages`, color: 'from-orange-400 to-amber-500' },
    { name: 'Himalayan Treks', id: 'adventure', icon: Mountain, count: `${DYNAMIC_TREKKING.length}+ Trails`, color: 'from-[#61c5a8] to-emerald-600' },
    { name: 'Romantic Escapes', id: 'romantic', icon: Heart, count: '18+ Packages', color: 'from-rose-400 to-pink-500' },
    { name: 'Group Departures', id: 'group', icon: Users, count: 'Fixed Dates', color: 'from-blue-400 to-indigo-500' }
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [categories.length]);

  return (
    <section className="py-16 md:py-20 bg-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 md:px-12 w-full">
        <SectionHeader title="Travel Your Way" subtitle="Choose from our meticulously crafted travel styles." center />

        {/* CAROUSEL */}
        <div className="relative">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-6 scrollbar-hide scroll-smooth">
            {categories.map((cat, idx) => (
              <Link
                to={`/category/${cat.id}`}
                key={cat.name}
                className="flex-shrink-0 w-[200px] md:w-[220px] snap-center group cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`bg-gradient-to-br ${cat.color} p-1 rounded-3xl aspect-square relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-3`}
                >
                  <div className="h-full w-full bg-slate-900/40 backdrop-blur-sm rounded-[22px] flex flex-col items-center justify-center p-5 text-center border border-white/10 group-hover:bg-black/10 transition-colors">
                    <div className="bg-white/20 p-5 rounded-2xl text-white mb-4 backdrop-blur-md border border-white/20">
                      <cat.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-white font-bold text-[15px] md:text-base leading-tight">{cat.name}</h3>
                    <p className="text-white/80 text-xs md:text-sm font-medium mt-1">{cat.count}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
};
const FeaturesSection = () => (
  <section className="py-16 bg-slate-50 border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-4 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: ShieldCheck, title: 'Verified Stays', desc: 'Handpicked hotels and premium camps for absolute safety and comfort.' },
          { icon: Users, title: 'Expert Trip Captains', desc: 'Certified local guides and experienced trek leaders with you 24/7.' },
          { icon: Heart, title: 'Curated Experiences', desc: "We don't just offer itineraries; we craft memories of a lifetime." },
          { icon: PhoneCall, title: '24/7 Ground Support', desc: 'Immediate assistance available anytime, anywhere during your journey.' }
        ].map((feat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center text-center group">
            <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:shadow-md group-hover:-translate-y-1 transition-all border border-slate-100">
              <feat.icon className="w-8 h-8 text-[#61c5a8]" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-2">{feat.title}</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed">{feat.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const SpiritualJourneysSection = () => (
  <section className="py-24 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <SectionHeader title="Sacred Yatras" subtitle="Embark on spiritual journeys to India's holiest shrines." />
        <Link to="/category/spiritual" className="text-[#61c5a8] font-bold hover:text-[#4ea88f] flex items-center gap-2 group mb-6 md:mb-0">
          View All Yatras <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 scrollbar-hide">
        {DYNAMIC_SPIRITUAL.map((tour: any, idx: number) => (
          <Link to={`/packages/${tour.id}`} key={tour.id} className="flex-shrink-0 w-[280px] md:w-auto snap-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-slate-100 group cursor-pointer">
              <div className="relative h-64 overflow-hidden">
                <img src={tour.image} alt={tour.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#61c5a8]" /> {tour.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-slate-900 mb-2">{tour.name}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-4">
                  <MapPin className="w-4 h-4 text-[#61c5a8]" /> {tour.places}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Starts at</p>
                    {tour.originalPrice && (
                      <p className="text-xs text-slate-400 line-through font-semibold">{tour.originalPrice}</p>
                    )}
                    <p className="text-xl font-black text-[#61c5a8]">{tour.price}</p>
                  </div>
                  <button className="bg-slate-50 hover:bg-[#61c5a8] text-slate-700 hover:text-white p-3 rounded-full transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const TrekkingSection = () => (
  <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4">Epic Treks &amp; Expeditions</h2>
          <p className="text-lg text-slate-400 font-medium max-w-2xl">Conquer the high altitudes with our expert-led mountain expeditions.</p>
        </div>
        <Link to="/category/adventure" className="text-[#61c5a8] font-bold hover:text-white flex items-center gap-2 group mt-6 md:mt-0 transition-colors">
          Explore All Treks <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DYNAMIC_TREKKING.map((trek: any, idx: number) => (
          <Link to={`/packages/${trek.id}`} key={trek.id}>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 group cursor-pointer">
              <div className="h-48 relative overflow-hidden">
                <img src={trek.image} alt={trek.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-white border border-slate-600">{trek.duration}</div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{trek.name}</h3>
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium mb-6"><Mountain className="w-4 h-4" /> {trek.difficulty}</div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Starts at</p>
                    {trek.originalPrice && (
                      <p className="text-xs text-slate-500 line-through font-semibold">{trek.originalPrice}</p>
                    )}
                    <p className="text-2xl font-black text-[#61c5a8]">{trek.price}</p>
                  </div>
                  <button className="bg-white/10 hover:bg-[#61c5a8] text-white hover:text-slate-900 p-3 rounded-2xl transition-all"><ChevronRight className="w-5 h-5" /></button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const GroupDeparturesSection = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 md:px-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <SectionHeader title="Upcoming Group Trips" subtitle="Fixed departures — join a batch and meet your new trek buddies." />
        <a href="https://wa.me/917009736873?text=Hi%2C%20I%20want%20to%20join%20a%20group%20departure" target="_blank" rel="noopener noreferrer"
          className="flex-shrink-0 flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#61c5a8] transition-colors">
          <PhoneCall className="w-4 h-4" /> Reserve a Spot
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {GROUP_DEPARTURES.map((trip, idx) => (
          <Link to={trip.link} key={trip.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
              whileHover={{ y: -6 }}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={trip.image} alt={trip.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full">{trip.date}</div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-white/30">{trip.duration}</div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-amber-300 text-[10px] font-bold">Only {trip.spots} seats left</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-base font-black text-slate-900 mb-3 leading-tight line-clamp-1">{trip.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-black text-[#61c5a8]">{trip.price}</p>
                  <button className="bg-slate-900 group-hover:bg-[#61c5a8] text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors">Book →</button>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

const HoneymoonSection = () => (
  <section className="py-24 bg-rose-50">
    <div className="max-w-7xl mx-auto px-4 md:px-12">
      <SectionHeader title="Romantic Escapes" subtitle="Handcrafted getaways for couples — mountains, deserts, and lakeside serenity." center />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {HONEYMOON_ESCAPES.map((pkg, idx) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl overflow-hidden shadow-xl group"
          >
            <div className="relative h-56 overflow-hidden">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2.5 rounded-2xl shadow">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
              </div>
              <div className="absolute bottom-4 left-4">
                <span className="text-rose-300 text-xs font-bold tracking-wider uppercase">{pkg.vibe}</span>
                <h3 className="text-xl font-black text-white leading-tight">{pkg.name}</h3>
              </div>
            </div>
            <div className="p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Starting from</p>
                <p className="text-3xl font-black text-slate-900">{pkg.price}</p>
              </div>
              <a
                href={`https://wa.me/917009736873?text=${encodeURIComponent(pkg.whatsappMsg)}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-3 px-5 rounded-2xl font-bold text-sm transition-all"
              >
                <PhoneCall className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const FeaturePlacesSection = () => {
  const [filter, setFilter] = useState('All');
  const [selectedDest, setSelectedDest] = useState<any>(null);
  const categories = ['All', 'Spiritual', 'Adventure'];

  const filtered = filter === 'All' ? DESTINATIONS : DESTINATIONS.filter((d: any) => d.category === filter);
  const slicedDestinations = filtered.slice(0, 8); // Slice top 8

  useEffect(() => {
    if (selectedDest) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [selectedDest]);

  return (
    <section id="destinations" className="py-16 md:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-12 gap-6">
          <SectionHeader title="Explore Collections" subtitle="Handpicked destinations showcasing the raw beauty and culture of India." />
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide snap-x">
            {categories.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-5 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold whitespace-nowrap transition-all snap-start ${filter === cat ? 'bg-slate-900 text-white shadow-md' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:border-[#61c5a8] hover:text-[#61c5a8]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible scrollbar-hide">
          <AnimatePresence>
            {slicedDestinations.map((dest: any) => (
              <Link to={`/packages/${dest.id}`} key={dest.id}>
                <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} className="flex-shrink-0 w-[75vw] sm:w-[300px] md:w-auto snap-center group cursor-pointer rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#61c5a8]/10 hover:border-[#61c5a8]/30 transition-all duration-500 flex flex-col">
                  <div className="h-40 md:h-48 overflow-hidden relative m-2 rounded-[1.25rem] md:rounded-[1.5rem]">
                    <img src={dest.image} alt={dest.name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 md:px-2.5 py-1 rounded-full flex items-center gap-1 text-[10px] md:text-xs font-bold shadow-sm">
                      <Star className="w-3 h-3 md:w-3.5 md:h-3.5 text-amber-500 fill-current" /> {dest.rating}
                    </div>
                  </div>
                  <div className="p-4 md:p-5 flex flex-col flex-grow">
                    <div className="text-[#61c5a8] font-bold text-[9px] md:text-[10px] tracking-widest uppercase mb-1.5">{dest.state}</div>
                    <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 leading-tight">{dest.name}</h3>
                    <div className="flex justify-between items-center mt-auto pt-3 md:pt-4 border-t border-slate-100">
                      <div>
                        <span className="font-bold text-slate-900 text-sm md:text-base">{dest.price}</span>
                      </div>
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#61c5a8] group-hover:border-[#61c5a8] group-hover:text-white transition-colors">
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
          <div className="w-4 md:hidden flex-shrink-0"></div>
        </motion.div>
        
        <div className="mt-8 md:mt-12 flex justify-center">
          <Link to={`/category/${filter === 'All' ? 'all' : filter.toLowerCase()}`}>
            <button className="flex items-center gap-3 px-8 py-4 bg-slate-50 text-slate-900 border border-slate-200 rounded-full font-bold hover:bg-[#61c5a8] hover:text-white hover:border-[#61c5a8] transition-all transform hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-[#61c5a8]/20 group">
              Explore More {filter !== 'All' ? filter : 'Destinations'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {selectedDest && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4" onClick={() => setSelectedDest(null)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={e => e.stopPropagation()} className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row shadow-2xl">
              <div className="md:w-1/2 relative h-64 md:h-auto flex-shrink-0">
                <img src={selectedDest.image} alt={selectedDest.name} className="w-full h-full object-cover" />
                <button onClick={() => setSelectedDest(null)} className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white backdrop-blur-md rounded-full text-slate-900 transition-colors md:hidden shadow-sm">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="md:w-1/2 p-6 md:p-12 overflow-y-auto">
                <div className="flex justify-between items-start mb-4 md:mb-6">
                  <div>
                    <span className="text-[#61c5a8] font-bold text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2 block">{selectedDest.state}</span>
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">{selectedDest.name}</h3>
                  </div>
                  <button onClick={() => setSelectedDest(null)} className="hidden md:flex p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                  <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">
                    <Star className="w-3 h-3 md:w-4 md:h-4 fill-current" /> {selectedDest.rating}
                  </div>
                  <div className="text-slate-500 text-xs md:text-sm font-medium">Starting from <span className="font-black text-slate-900 text-base md:text-lg ml-1">{selectedDest.price}</span></div>
                </div>
                <p className="text-slate-600 leading-relaxed mb-6 md:mb-8 text-sm md:text-lg">{selectedDest.details}</p>
                <Link to={`/packages/${selectedDest.id}`}>
                  <button className="w-full py-3.5 md:py-4 bg-[#61c5a8] text-white rounded-xl md:rounded-full font-bold hover:bg-[#4ea88f] transition-colors shadow-lg shadow-[#61c5a8]/20 active:scale-95 text-sm md:text-base">
                    View Full Details
                  </button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const AdvancedAbout = () => (
  <section id="about" className="py-16 md:py-24 bg-white relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 md:px-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <motion.img initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800" alt="Camping" className="rounded-[1.5rem] md:rounded-[2rem] object-cover h-48 md:h-64 w-full mt-4 md:mt-8 shadow-lg" />
            <motion.img initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} src="https://images.unsplash.com/photo-1544634076-a90160ddf44c?auto=format&fit=crop&q=80&w=800" alt="Mountains" className="rounded-[1.5rem] md:rounded-[2rem] object-cover h-64 md:h-80 w-full shadow-lg" />
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-3xl shadow-2xl text-center border-4 border-slate-50 w-[140px] md:w-auto">
            <div className="flex justify-center mb-1 md:mb-2 text-[#2d5a27]"><Tent className="w-6 h-6 md:w-8 md:h-8" /></div>
            <div className="text-2xl md:text-3xl font-black text-[#61c5a8] mb-0.5 md:mb-1">15+</div>
            <div className="text-[10px] md:text-xs font-bold text-slate-900 uppercase tracking-widest">Years of<br />Exploration</div>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#61c5a8]/10 text-[#61c5a8] font-bold text-[10px] md:text-xs uppercase tracking-widest mb-4 md:mb-6 border border-[#61c5a8]/20">
            <Footprints className="w-3 h-3 md:w-4 md:h-4" /> Escape with us
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">
            Masters of Himalayan Treks &amp; Sacred Yatras.
          </h2>
          <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 leading-relaxed font-medium">
            Based in the heart of India, <span className="text-[#61c5a8] font-bold">Travelling Partners</span> specializes in highly curated experiences. From extreme altitude Himalayan treks and wild camping to deeply profound spiritual circuits like the Char Dham. We handle the logistics, you make the memories.
          </p>
          <div className="grid grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-10">
            <div className="bg-slate-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100">
              <div className="text-2xl md:text-3xl font-black text-[#8b5a2b] mb-1">10k+</div>
              <div className="text-[10px] md:text-sm text-slate-600 font-bold uppercase tracking-wider">Happy Campers</div>
            </div>
            <div className="bg-slate-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-slate-100">
              <div className="text-2xl md:text-3xl font-black text-[#2d5a27] mb-1">200+</div>
              <div className="text-[10px] md:text-sm text-slate-600 font-bold uppercase tracking-wider">Curated Routes</div>
            </div>
          </div>
          <Link to="/about">
            <button className="w-full md:w-auto px-8 py-3.5 md:py-4 rounded-full bg-slate-900 text-white font-bold hover:bg-[#61c5a8] transition-colors shadow-xl text-sm md:text-base">
              Meet The Team
            </button>
          </Link>
        </div>
      </div>
    </div>
  </section>
);

const StoriesSection = () => {
  const [activeStory, setActiveStory] = useState(STORIES[0]);
  return (
    <section id="stories" className="py-16 md:py-24 bg-slate-50 overflow-hidden relative border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <SectionHeader title="Journeys That Inspire" subtitle="Real stories from travelers who escaped the ordinary with Travelling Partners." />
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 mt-8 md:mt-12 items-start">
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32 relative order-1 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div key={activeStory.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.5 }} className="bg-white border border-slate-200 p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-slate-100">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-[#61c5a8]/10 rounded-2xl flex items-center justify-center mb-4 md:mb-6">
                  <Quote className="w-5 h-5 md:w-6 md:h-6 text-[#61c5a8]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 md:mb-6 leading-tight">{activeStory.title}</h3>
                <p className="text-slate-600 leading-relaxed text-base md:text-lg mb-6 md:mb-8 italic">"{activeStory.full}"</p>
                <div className="flex items-center gap-3 md:gap-4 pt-4 md:pt-6 border-t border-slate-100">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 flex items-center justify-center text-white text-lg md:text-xl font-bold">{activeStory.traveler.charAt(0)}</div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm md:text-base">{activeStory.traveler}</div>
                    <div className="text-xs md:text-sm text-slate-500 font-medium">{activeStory.date}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col gap-4 order-2 lg:order-2">
            {STORIES.map((story) => (
              <div key={story.id} onClick={() => setActiveStory(story)} className={`flex flex-col sm:flex-row gap-4 md:gap-5 p-3 md:p-4 rounded-3xl cursor-pointer transition-all duration-300 ${activeStory.id === story.id ? 'bg-white border-2 border-[#61c5a8] shadow-md scale-[1.02] md:scale-100' : 'bg-white border-2 border-slate-100 hover:border-[#61c5a8]/40'}`}>
                <img src={story.image} alt={story.title} className="w-full sm:w-32 md:w-40 h-48 sm:h-32 md:h-36 object-cover rounded-[1.5rem] md:rounded-2xl shrink-0" />
                <div className="flex flex-col justify-center py-2 px-2 md:px-0">
                  <h4 className="text-lg md:text-xl font-black text-slate-900 mb-1 md:mb-2 line-clamp-2">{story.title}</h4>
                  <p className="text-xs md:text-sm text-slate-500 mb-2 md:mb-3 line-clamp-2 font-medium">{story.excerpt}</p>
                  <div className="text-[10px] md:text-xs font-bold text-[#61c5a8] mt-auto uppercase tracking-wider">— {story.traveler}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 md:px-12">
        <SectionHeader title="Frequently Asked Questions" center={true} />
        <div className="mt-8 flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <div key={i} className={`border border-slate-200 rounded-[1.5rem] overflow-hidden transition-all bg-white ${openIndex === i ? 'shadow-md border-[#61c5a8]/50' : 'hover:border-slate-300'}`}>
              <button className="w-full px-6 py-5 text-left flex justify-between items-center font-bold text-slate-900 text-sm md:text-base" onClick={() => setOpenIndex(openIndex === i ? -1 : i)}>
                {faq.question}
                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-[#61c5a8]' : 'text-slate-400'}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <div className="px-6 pb-6 text-slate-600 font-medium text-sm md:text-base leading-relaxed border-t border-slate-50 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-16 md:py-24 bg-[#61c5a8] relative overflow-hidden">
    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
      <MapIcon className="w-[800px] h-[800px] absolute -right-40 -top-40 text-black animate-[spin_120s_linear_infinite]" />
    </div>
    <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
      <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">Ready to begin your next great adventure?</h2>
      <p className="text-white/90 text-lg md:text-xl font-medium mb-10 max-w-2xl mx-auto">Get in touch with our travel experts to craft a personalized itinerary that fits your dreams.</p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/contact">
          <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-white hover:text-slate-900 transition-colors w-full sm:w-auto">
            Plan My Trip
          </button>
        </Link>
        <a href="tel:+917009736873" className="bg-white/20 backdrop-blur text-white border border-white/50 px-8 py-4 rounded-full font-bold hover:bg-white hover:text-slate-900 transition-colors flex justify-center items-center gap-2 w-full sm:w-auto">
          <PhoneCall className="w-4 h-4" /> Call Us Now
        </a>
      </div>
    </div>
  </section>
);

export default function Home() {
  useMeta({
    title: 'Himalayan Treks, Pilgrimages & Expeditions',
    description: 'Travelling Partners offers handcrafted Himalayan journeys — Char Dham Yatra, Winter Spiti, Kedarnath, Sar Pass, Manimahesh & more. Fixed group departures from Delhi.',
    url: '/'
  });
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#61c5a8]/30 selection:text-slate-900">
      <main>
        <AdvancedHero />
        <TripCategories />
        <FeaturesSection />
        <SpiritualJourneysSection />
        <TrekkingSection />
        <GroupDeparturesSection />
        <HoneymoonSection />
        <FeaturePlacesSection />
        <AdvancedAbout />
        <StoriesSection />
        <FaqSection />
        <CTASection />
      </main>
    </div>
  );
}