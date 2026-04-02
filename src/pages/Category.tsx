import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, ChevronRight, Mountain, Sparkles, Heart, Users, Tag } from 'lucide-react';
import packagesData from '../lib/Packages.json';
import { useMeta } from '../hooks/useMeta';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  // Determine category info and filter logic based on the requested category id
  const { title, subtitle, icon: Icon, filteredPackages, colorClass } = useMemo(() => {
    switch (categoryId) {
      // ─── New category-field based routes (from updated header) ───
      case 'pilgrimage':
        return {
          title: 'Pilgrimages & Yatras',
          subtitle: 'Sacred journeys to ancient shrines — Char Dham, Kailash, Kedarnath and beyond.',
          icon: Sparkles,
          colorClass: 'text-amber-500',
          filteredPackages: packagesData.filter((p: any) =>
            p.category === 'Pilgrimage' || p.category === 'Pilgrimage & Trekking'
          ),
        };
      case 'trekking':
        return {
          title: 'Himalayan Treks',
          subtitle: 'Trail-tested routes for every level — from beginner meadows to technical high passes.',
          icon: Mountain,
          colorClass: 'text-[#61c5a8]',
          filteredPackages: packagesData.filter((p: any) => p.category === 'Trekking'),
        };
      case 'expedition':
        return {
          title: 'Expeditions',
          subtitle: 'High-altitude, off-road expeditions into the most remote corners of the Himalayas.',
          icon: Mountain,
          colorClass: 'text-indigo-400',
          filteredPackages: packagesData.filter((p: any) => p.category === 'Expedition'),
        };
      case 'leisure':
        return {
          title: 'Backpacking & Leisure',
          subtitle: 'Laid-back trips to hidden villages, desert dunes, and royal cities.',
          icon: Heart,
          colorClass: 'text-rose-400',
          filteredPackages: packagesData.filter((p: any) => p.category === 'Backpacking & Leisure'),
        };
      // ─── Legacy routes (backward compat) ───
      case 'spiritual':
        return {
          title: 'Spiritual Yatras',
          subtitle: 'Embark on profound spiritual journeys to sacred shrines.',
          icon: Sparkles,
          colorClass: 'text-amber-500',
          filteredPackages: packagesData.filter((p: any) =>
            p.category === 'Pilgrimage' || p.category === 'Pilgrimage & Trekking'
          ),
        };
      case 'adventure':
        return {
          title: 'Himalayan Treks',
          subtitle: 'Conquer high altitudes with our expert mountain expeditions.',
          icon: Mountain,
          colorClass: 'text-[#61c5a8]',
          filteredPackages: packagesData.filter((p: any) =>
            p.category === 'Trekking' || p.category === 'Expedition'
          ),
        };
      case 'romantic':
        return {
          title: 'Romantic Escapes',
          subtitle: 'Handcrafted honeymoon packages for perfect beginnings.',
          icon: Heart,
          colorClass: 'text-rose-500',
          filteredPackages: packagesData.filter((p: any) =>
            p.id.includes('manali') ||
            p.id.includes('kashmir') ||
            p.id.includes('jibhi') ||
            p.id.includes('jaisalmer')
          ),
        };
      case 'group':
        return {
          title: 'Group Departures',
          subtitle: 'Fixed departure dates with fellow explorers.',
          icon: Users,
          colorClass: 'text-blue-500',
          filteredPackages: packagesData.slice(10, 15),
        };
      default:
        return {
          title: 'All Collections',
          subtitle: 'Explore our full catalogue of journeys.',
          icon: MapPin,
          colorClass: 'text-slate-900',
          filteredPackages: packagesData,
        };
    }
  }, [categoryId]);

  useMeta({
    title: title,
    description: subtitle,
    url: `/category/${categoryId}`
  });

  return (
    <div className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section styled nicely matching the site's theme */}
        <div className="text-center mb-16 relative">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-100"
          >
            <Icon className={`w-8 h-8 ${colorClass}`} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight"
          >
            {title}
          </motion.h1>
          <div className="w-24 h-1.5 bg-[#61c5a8] mx-auto rounded-full mt-6 mb-6"></div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }} 
            className="text-slate-500 font-medium max-w-2xl mx-auto text-lg"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg: any) => (
              <motion.div 
                key={pkg.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(97,197,168,0.15)] transition-all duration-300 border border-slate-100 group cursor-pointer flex flex-col"
              >
                <Link to={`/packages/${pkg.id}`} className="flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden shrink-0 m-2 rounded-[1.5rem]">
                    <img src={pkg.heroImage} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-slate-800 shadow-sm border border-slate-200">
                      <Clock className={`w-3.5 h-3.5 ${colorClass}`} />
                      {pkg.duration}
                    </div>
                    {pkg.category && (
                      <div className="absolute top-3 right-3 bg-amber-400 text-slate-900 px-2.5 py-1 rounded-full text-[10px] font-black flex items-center gap-1 shadow">
                        <Tag className="w-3 h-3" /> {pkg.category}
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className={`flex items-center gap-2 text-xs font-black ${colorClass} mb-3 uppercase tracking-wider`}>
                      <MapPin className="w-4 h-4" />
                      {pkg.location}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight group-hover:text-[#61c5a8] transition-colors">{pkg.title}</h3>
                    
                    <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium flex-grow leading-relaxed">
                      {pkg.story}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-auto">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Starting from</p>
                        {(pkg as any).originalPrice && (
                          <p className="text-xs text-slate-400 line-through font-semibold">{(pkg as any).originalPrice}</p>
                        )}
                        <p className="text-2xl font-black text-slate-900">{pkg.price}</p>
                      </div>
                      <div className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-[#61c5a8] group-hover:border-[#61c5a8] transition-all">
                        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-xl text-slate-500 font-medium">No packages found for this category at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
