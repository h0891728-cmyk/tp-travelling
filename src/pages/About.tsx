// Comprehensive About page using real CSV images and proper English content
import React from 'react';
import { motion } from 'framer-motion';
import {
  Footprints, Mountain, Users, ShieldCheck,
  Heart, Calendar, Map, Star, Award, Compass, Tent, Trophy
} from 'lucide-react';
import { useMeta } from '../hooks/useMeta';

// ── Real images from CSV ──────────────────────────────────────────────────────
const IMG = {
  // Winter Spiti group shots
  groupSpiti1: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/WINTERSPITITP/0.jpg',
  groupSpiti2: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/WINTERSPITITP/10.jpg',
  groupSpiti3: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/WINTERSPITITP/14.jpg',
  groupSpiti4: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/WINTERSPITITP/23.jpg',

  // Kedarnath / Char Dham
  kedarnath1: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/1.jpeg',
  kedarnath2: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/6.jpeg',
  kedarnath3: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KEDARNATH/7.jpeg',
  
  // Manali
  manali1: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/MANALI/1.jpeg',
  manali4: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/MANALI/4.jpeg',
  manali6: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/MANALI/6.jpeg',

  // Jaisalmer
  jaisalmer1: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/Jaisalmer/IMG-20251125-WA0023.jpg',
  jaisalmer2: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/Jaisalmer/IMG-20251125-WA0027.jpg',
  jaisalmer3: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/Jaisalmer/IMG-20251125-WA0030.jpg',

  // Tungnath / Chopta
  tungnath1: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/TUNGNATH/1.jpeg',
  tungnath4: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/TUNGNATH/4.jpeg',
  tungnath8: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/TUNGNATH/8.jpeg',

  // Manimahesh
  mani1: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/MANIMAHESH/1.jpeg',
  mani2: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/MANIMAHESH/2.jpeg',
  mani9: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/MANIMAHESH/9.jpeg',

  // Sar Pass
  sarPass1: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/SAR-PASS/1.jpeg',
  sarPass5: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/SAR-PASS/5.jpeg',

  // Yulla Kanda
  yulla1: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/YULLA-KANDA/1.jpeg',
  yulla2: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/YULLA-KANDA/2.jpeg',
  yulla5: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/YULLA-KANDA/5.jpeg',

  // Kareri Lake
  kareri5: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KARERI-LAKE/5.jpeg',
  kareri6: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/KARERI-LAKE/6.jpeg',

  // Nag Tibba
  nag1: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/NAG/IMG_4570.jpg',
  nag2: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/NAG/IMG_4611.jpg',
  nag3: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/NAG/IMG_4644.jpg',

  // Winter Kashmir
  kashmir1: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/WINTERKASHMIR/11.jpg',
  kashmir2: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/WINTERKASHMIR/13.jpg',

  // Jibhi
  jibhi1: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/Jibhi/20241231_155606(0).jpg',
};

const GALLERY_PHOTOS = [
  { src: IMG.groupSpiti1, label: 'Winter Spiti Group' },
  { src: IMG.kedarnath2,  label: 'Kedarnath Temple' },
  { src: IMG.manali4,     label: 'Manali Snowfields' },
  { src: IMG.mani9,       label: 'Manimahesh Lake' },
  { src: IMG.tungnath4,   label: 'Tungnath Trek' },
  { src: IMG.jaisalmer2,  label: 'Jaisalmer Desert' },
  { src: IMG.sarPass1,    label: 'Sar Pass Summit' },
  { src: IMG.yulla1,      label: 'Yulla Kanda Peak' },
  { src: IMG.nag3,        label: 'Nag Tibba Ridge' },
];

const STATS = [
  { icon: Users,    label: 'Happy Travellers', value: '10,000+' },
  { icon: Mountain, label: 'Peaks & Passes',   value: '120+' },
  { icon: Calendar, label: 'Years of Service',  value: '9+' },
  { icon: Trophy,   label: 'Curated Routes',    value: '35+' },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Safety First, Always',
    desc: 'Every route is pre-scouted. Our trip leaders are wilderness first-aid trained. We never compromise safety for schedule.',
    img: IMG.groupSpiti4,
  },
  {
    icon: Heart,
    title: 'Real, Unfiltered Experiences',
    desc: 'No luxury resorts disguised as "adventure." From Spiti homestays to Manimahesh camping — we keep it genuinely Himalayan.',
    img: IMG.mani1,
  },
  {
    icon: Tent,
    title: 'Community-Driven Travel',
    desc: 'We\'re a 10,000-member family. Every stranger who joins a trip leaves as a friend. That\'s the Travelling Partners way.',
    img: IMG.tungnath1,
  },
];

const TIMELINE = [
  { year: '2016', icon: Footprints, title: 'The First Step', desc: 'Jeetu took his first solo trip from Delhi into the Himalayas. The mountains answered every question he had been asking.' },
  { year: '2018', icon: Users,      title: 'Building the Community', desc: 'Word spread. Small groups of students, spiritual seekers, and solo travellers began joining fixed departures.' },
  { year: '2020', icon: Compass,    title: 'Systems & Scale', desc: 'Travelling Partners launched structured fixed departures, premium Volvo bus bookings, and a dedicated support team.' },
  { year: '2022', icon: Mountain,   title: 'Himalayan Specialists', desc: 'From Char Dham to Winter Spiti — we became the trusted name for off-season and high-altitude Himalayan journeys.' },
  { year: '2024', icon: Trophy,     title: '10,000+ Journeys Later', desc: 'A decade of turning strangers into trekking partners, pilgrims into explorers, and dreamers into summit-achievers.' },
];

const About = () => {
  useMeta({
    title: 'About Us — Our Story',
    description: 'Started in Delhi in 2016, Travelling Partners has grown into a 10,000+ community. Learn about our founders, values, and 9 years of Himalayan journey expertise.',
    image: 'https://raw.githubusercontent.com/h0891728-cmyk/images/main/WINTERSPITITP/0.jpg',
    url: '/about'
  });
  return (
    <div className="pt-28 pb-24 bg-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-[560px]"
          >
            {/* Main image */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl">
              <img src={IMG.groupSpiti1} alt="Travelling Partners Group" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-white text-2xl font-black italic leading-snug">"Mountains don't demand, they just give."</h3>
                  <p className="text-[#61c5a8] font-bold uppercase tracking-widest mt-2 text-sm">— Jeetu, Founder · Travelling Partners</p>
                </div>
              </div>
            </div>
            {/* Floating accent image — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -top-6 -right-6 w-44 h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-10"
            >
              <img src={IMG.kedarnath3} alt="Kedarnath" className="w-full h-full object-cover" />
            </motion.div>
            {/* Floating accent image — bottom left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 w-40 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-white z-10"
            >
              <img src={IMG.tungnath4} alt="Tungnath Trek" className="w-full h-full object-cover" />
            </motion.div>
            {/* Glow blobs */}
            <div className="absolute -top-8 -left-8 w-40 h-40 bg-[#61c5a8]/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -right-8 w-56 h-56 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#61c5a8]/10 text-[#61c5a8] font-black text-xs uppercase tracking-widest mb-6 border border-[#61c5a8]/20">
              <Star className="w-4 h-4" /> Our Real Story
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-5 leading-tight">
              Started in Delhi, <br />
              <span className="text-[#61c5a8]">Conquered</span> the Peaks.
            </h1>
            <p className="text-lg text-slate-600 mb-5 leading-relaxed font-medium">
              In 2016, <strong>Jeetu</strong> booked his first bus ticket to Spiti on a whim. He returned not just with photographs — but with a purpose. <span className="text-[#61c5a8] font-bold">Travelling Partners</span> was born out of that single journey.
            </p>
            <p className="text-base text-slate-500 mb-8 leading-relaxed">
              Today, we are a 10,000+ strong community of pilgrims, trekkers, backpackers, and weekend warriors — all united by one belief: <em>the best version of yourself lives at altitude.</em>
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Map,     label: 'Headquartered', value: 'Delhi NCR, India' },
                { icon: Award,   label: 'Established',   value: 'Since 2016' },
                { icon: Mountain,label: 'Speciality',    value: 'Himalayan Journeys' },
                { icon: Users,   label: 'Community',     value: '10,000+ Travellers' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 bg-[#61c5a8]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#61c5a8]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{item.label}</p>
                    <p className="font-bold text-slate-800 text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── STATS BAR ────────────────────────────────── */}
      <div className="bg-slate-900 py-14 mb-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <s.icon className="w-8 h-8 text-[#61c5a8] mx-auto mb-3" />
              <p className="text-4xl font-black text-white mb-1">{s.value}</p>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── PHOTO GALLERY ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">Real Trips. Real Photos.</h2>
          <div className="w-20 h-1.5 bg-[#61c5a8] mx-auto rounded-full mb-4" />
          <p className="text-slate-500 font-medium max-w-xl mx-auto">Every photo below was taken by our travellers on actual Travelling Partners trips — no stock, no staging.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {GALLERY_PHOTOS.map((ph, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`relative overflow-hidden rounded-2xl group ${i === 0 ? 'col-span-2 row-span-2 h-[420px]' : 'h-[200px]'}`}
            >
              <img
                src={ph.src}
                alt={ph.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white font-bold text-sm">{ph.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── TIMELINE ─────────────────────────────────── */}
      <section className="bg-slate-50 py-24 mb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight uppercase">Our Journey</h2>
            <div className="w-20 h-2 bg-[#61c5a8] mx-auto rounded-full" />
          </div>
          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2" />
            {TIMELINE.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex items-center mb-16 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="ml-20 md:ml-0 md:w-1/2 px-6">
                  <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#61c5a8]/30 transition-all">
                    <span className="text-[#61c5a8] font-black text-4xl opacity-20 block leading-none mb-1">{step.year}</span>
                    <h4 className="text-xl font-black text-slate-900 mb-2">{step.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed text-sm">{step.desc}</p>
                  </div>
                </div>
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-14 h-14 bg-white border-4 border-[#61c5a8] rounded-full flex items-center justify-center z-10 shadow-lg">
                  <step.icon className="w-6 h-6 text-[#61c5a8]" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ──────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight">What We Stand For</h2>
          <div className="w-20 h-1.5 bg-[#61c5a8] mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group"
            >
              <div className="h-52 overflow-hidden">
                <img src={v.img} alt={v.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-7">
                <div className="w-12 h-12 bg-[#61c5a8]/10 rounded-xl flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-[#61c5a8]" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{v.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default About;