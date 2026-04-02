import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, ChevronRight, Tag, Mountain, Sparkles, Heart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import packagesData from '../lib/Packages.json';
import { useMeta } from '../hooks/useMeta';

type AnyPkg = typeof packagesData[0] & { category?: string; originalPrice?: string };

const CATEGORIES = [
  { id: 'all',       label: 'All',                   icon: Globe,     color: 'text-slate-700' },
  { id: 'pilgrimage',label: 'Pilgrimages',            icon: Sparkles,  color: 'text-amber-500' },
  { id: 'trekking',  label: 'Treks',                  icon: Mountain,  color: 'text-[#61c5a8]' },
  { id: 'expedition',label: 'Expeditions',            icon: Mountain,  color: 'text-indigo-500' },
  { id: 'leisure',   label: 'Backpacking & Leisure',  icon: Heart,     color: 'text-rose-500' },
];

const getCategoryMatch = (categoryId: string, pkg: AnyPkg) => {
  switch (categoryId) {
    case 'pilgrimage':  return (pkg as any).category === 'Pilgrimage' || (pkg as any).category === 'Pilgrimage & Trekking';
    case 'trekking':    return (pkg as any).category === 'Trekking';
    case 'expedition':  return (pkg as any).category === 'Expedition';
    case 'leisure':     return (pkg as any).category === 'Backpacking & Leisure';
    default:            return true;
  }
};

const PackageCard = ({ pkg }: { pkg: AnyPkg }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ y: -8 }}
    className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(97,197,168,0.15)] transition-all duration-300 border border-slate-100 group cursor-pointer flex flex-col"
  >
    <Link to={`/packages/${pkg.id}`} className="flex flex-col h-full">
      <div className="relative h-56 overflow-hidden shrink-0">
        <img
          src={pkg.heroImage}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-slate-800 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-[#61c5a8]" /> {pkg.duration}
        </div>
        {(pkg as any).category && (
          <div className="absolute top-3 left-3 bg-amber-400 text-slate-900 px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow">
            <Tag className="w-3 h-3" /> {(pkg as any).category}
          </div>
        )}
        {(pkg as any).originalPrice && (
          <div className="absolute bottom-3 right-3 bg-rose-500 text-white px-2.5 py-1 rounded-full text-[10px] font-black shadow">
            SPECIAL OFFER
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-1.5 text-xs font-black text-[#61c5a8] mb-2 uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{pkg.location}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-[#61c5a8] transition-colors">
          {pkg.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 font-medium flex-grow leading-relaxed">
          {pkg.story}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Starting from</p>
            {(pkg as any).originalPrice && (
              <p className="text-xs text-slate-400 line-through font-semibold leading-tight">{(pkg as any).originalPrice}</p>
            )}
            <p className="text-xl font-black text-slate-900 leading-tight">{pkg.price}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#61c5a8]/10 flex items-center justify-center group-hover:bg-[#61c5a8] transition-colors flex-shrink-0">
            <ChevronRight className="w-4 h-4 text-[#61c5a8] group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  </motion.div>
);

const Packages = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showAll, setShowAll] = useState(false);

  useMeta({
    title: 'All Packages — Treks, Pilgrimages & Expeditions',
    description: 'Browse 35+ handcrafted Himalayan packages — Char Dham Yatra, Winter Spiti, Sar Pass, Manimahesh, Kedarnath, Manali and more. Fixed group departures from Delhi.',
    url: '/packages'
  });

  const allPkgs = packagesData as AnyPkg[];
  const filtered = allPkgs.filter(p => getCategoryMatch(activeCategory, p));
  const visible = showAll ? filtered : filtered.slice(0, 8);
  const hasMore = filtered.length > 8;

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setShowAll(false);
  };

  return (
    <div className="pt-28 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-black text-[#61c5a8] uppercase tracking-[0.3em] mb-3">Explore India's Finest</p>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">Our Expeditions</h1>
          <div className="w-24 h-1.5 bg-[#61c5a8] mx-auto rounded-full" />
          <p className="mt-5 text-slate-500 font-medium max-w-2xl mx-auto text-lg">
            Handcrafted journeys across the Himalayas — pilgrimages, treks, expeditions, and leisure escapes.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#61c5a8] text-white shadow-lg shadow-[#61c5a8]/30 scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#61c5a8] hover:text-[#61c5a8]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {cat.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-black ${isActive ? 'bg-white/20' : 'bg-slate-100'}`}>
                  {allPkgs.filter(p => getCategoryMatch(cat.id, p)).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {visible.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
          </motion.div>
        </AnimatePresence>

        {/* Show More */}
        {hasMore && !showAll && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 bg-white border-2 border-[#61c5a8] text-[#61c5a8] hover:bg-[#61c5a8] hover:text-white px-8 py-4 rounded-full font-black text-base transition-all shadow-lg hover:shadow-[#61c5a8]/30 active:scale-95"
            >
              Show {filtered.length - 8} More Packages <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* No Results */}
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-slate-400 font-medium">No packages in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
