import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ChevronDown, MapPin, Clock, ChevronRight, Info, Phone, FileText, MessageCircle } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import packagesData from '../lib/Packages.json';
import logoImg from '../logo.png';

// --- Configuration ---
const WHATSAPP_NUMBER = "917009736873"; // Replace with your actual WhatsApp number (include country code, no +)
const WHATSAPP_MESSAGE = "Hello Travelling Partners! I would like to plan a trip.";
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

// --- Category Logic (uses category field from Packages.json) ---
const tripCategories = [
  { id: 'pilgrimage', label: 'Pilgrimages & Yatras', categoryMatch: ['Pilgrimage', 'Pilgrimage & Trekking'] },
  { id: 'trekking',  label: 'Himalayan Treks',      categoryMatch: ['Trekking'] },
  { id: 'expedition',label: 'Expeditions',           categoryMatch: ['Expedition'] },
  { id: 'leisure',   label: 'Backpacking & Leisure', categoryMatch: ['Backpacking & Leisure'] },
];

const getPackagesForCategory = (categoryId: string) => {
  const cat = tripCategories.find(c => c.id === categoryId);
  if (!cat) return [];
  return (packagesData as any[]).filter(pkg => cat.categoryMatch.includes(pkg.category));
};

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  // UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Desktop Menu States
  const [activeMegaMenu, setActiveMegaMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState(tripCategories[0].id);
  const [activeInfoDropdown, setActiveInfoDropdown] = useState(false);
  
  // Mobile Accordion States
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveMegaMenu(false);
    setActiveInfoDropdown(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu or search is open
  useEffect(() => {
    if (mobileMenuOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen, searchOpen]);

  const navTextColor = scrolled || !isHome ? 'text-slate-700' : 'text-white';
  const navHoverColor = 'hover:text-[#61c5a8]';

  // Quick search filter
  const searchResults = searchQuery.trim() === '' 
    ? [] 
    : packagesData.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4);

  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled || !isHome ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-[#61c5a8]/20' : 'bg-gradient-to-b from-black/60 to-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer group z-50">
            <div className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all flex-shrink-0 ${
              scrolled || !isHome
                ? 'border-[#61c5a8]/50 shadow-md'
                : 'border-white/40 shadow-lg'
            }`}>
              <img src={logoImg} alt="Travelling Partners Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className={`text-[9px] md:text-[10px] uppercase font-bold tracking-widest leading-none mb-1 ${scrolled || !isHome ? 'text-[#8b5a2b]' : 'text-white/80'}`}>Escape With</span>
              <span className={`text-lg md:text-xl font-black tracking-tight leading-none ${scrolled || !isHome ? 'text-slate-900' : 'text-white'}`}>
                TRAVELLING PARTNERS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 h-full">
            <Link to="/" className={`text-sm font-bold uppercase tracking-wide transition-colors ${navTextColor} ${navHoverColor}`}>
              Home
            </Link>

            {/* Packages Mega Menu Trigger */}
            <div 
              className="h-full py-4 relative"
              onMouseEnter={() => { setActiveMegaMenu(true); setActiveInfoDropdown(false); }}
              onMouseLeave={() => setActiveMegaMenu(false)}
            >
              <button className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide transition-colors ${navTextColor} ${navHoverColor}`}>
                Destinations <ChevronDown className="w-4 h-4" />
              </button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {activeMegaMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] bg-white rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden flex z-50"
                  >
                    {/* Left Sidebar Categories */}
                    <div className="w-1/3 bg-slate-50 p-6 border-r border-slate-100">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Trip Styles</h4>
                      <ul className="space-y-2">
                        {tripCategories.map(cat => (
                          <li key={cat.id}>
                            <button 
                              onMouseEnter={() => setActiveCategory(cat.id)}
                              className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all text-sm flex items-center justify-between group
                                ${activeCategory === cat.id ? 'bg-[#61c5a8] text-white shadow-md' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
                            >
                              {cat.label}
                              <ChevronRight className={`w-4 h-4 transition-transform ${activeCategory === cat.id ? 'translate-x-1 text-white' : 'text-slate-300 group-hover:text-[#61c5a8]'}`} />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <Link to="/packages" className="mt-6 block text-center text-sm font-bold text-[#61c5a8] hover:text-[#4ea88f] transition-colors p-3">
                        View All Packages →
                      </Link>
                    </div>

                    {/* Right Content Area */}
                    <div className="w-2/3 p-6 bg-white">
                      <h4 className="text-xl font-black text-slate-900 mb-6">Popular {tripCategories.find(c => c.id === activeCategory)?.label}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {getPackagesForCategory(activeCategory).slice(0, 4).map(pkg => (
                          <Link key={pkg.id} to={`/packages/${pkg.id}`} className="group block">
                            <div className="relative h-28 rounded-xl overflow-hidden mb-3">
                              <img src={pkg.heroImage} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                              <div className="absolute bottom-2 left-2 text-white flex flex-col">
                                <span className="text-[10px] font-bold bg-[#61c5a8] px-2 py-0.5 rounded w-max mb-1">{pkg.duration}</span>
                                <span className="text-[10px] flex items-center gap-1 font-medium"><MapPin className="w-3 h-3" /> {pkg.location.split(',')[0]}</span>
                              </div>
                            </div>
                            <h5 className="font-bold text-slate-900 text-sm leading-tight group-hover:text-[#61c5a8] transition-colors line-clamp-1">{pkg.title}</h5>
                            <p className="text-xs font-bold text-slate-500 mt-1">{pkg.price}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company Dropdown */}
            <div 
              className="h-full py-4 relative"
              onMouseEnter={() => { setActiveInfoDropdown(true); setActiveMegaMenu(false); }}
              onMouseLeave={() => setActiveInfoDropdown(false)}
            >
              <button className={`flex items-center gap-1 text-sm font-bold uppercase tracking-wide transition-colors ${navTextColor} ${navHoverColor}`}>
                Company <ChevronDown className="w-4 h-4" />
              </button>

              <AnimatePresence>
                {activeInfoDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 w-56 bg-white rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-50 py-2"
                  >
                    <Link to="/about" className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#61c5a8] transition-colors">
                      <Info className="w-4 h-4" /> About Us
                    </Link>
                    <Link to="/contact" className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#61c5a8] transition-colors">
                      <Phone className="w-4 h-4" /> Contact Support
                    </Link>
                    <div className="h-px bg-slate-100 my-1 mx-4"></div>
                    <Link to="/terms" className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#61c5a8] transition-colors">
                      <FileText className="w-4 h-4" /> Terms & Conditions
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => setSearchOpen(true)}
              className={`p-2 rounded-full transition-colors ${scrolled || !isHome ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/20'}`}
            >
              <Search className="w-5 h-5" />
            </button>
            <a 
              href={WA_URL} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg active:scale-95 ${
                scrolled || !isHome ? 'bg-[#25D366] text-white hover:bg-[#20bd5a]' : 'bg-[#25D366] text-white hover:bg-[#20bd5a]'
              }`}
            >
              <MessageCircle className="w-4 h-4" /> Plan a Trip
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <button 
              onClick={() => setSearchOpen(true)}
              className={`p-2 rounded-full transition-colors ${scrolled || !isHome ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/20'}`}
            >
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-lg bg-white/10 backdrop-blur-sm z-50" onClick={() => setMobileMenuOpen(true)}>
              <Menu className={`w-6 h-6 ${scrolled || !isHome ? 'text-slate-900' : 'text-white'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* --- Search Popup Modal --- */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex justify-center items-start pt-20 md:pt-32 px-4"
          >
            <div className="absolute inset-0" onClick={() => setSearchOpen(false)}></div>
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[70vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center gap-4">
                <Search className="w-6 h-6 text-slate-400 shrink-0" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Search destinations, packages, or keywords..." 
                  className="w-full text-xl font-bold text-slate-800 placeholder:text-slate-300 outline-none bg-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={() => setSearchOpen(false)} className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors shrink-0">
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto">
                {searchQuery.trim() === '' ? (
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {['Kedarnath', 'Spiti Valley', 'Kashmir', 'Treks'].map(term => (
                        <button key={term} onClick={() => setSearchQuery(term)} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-600 hover:bg-[#61c5a8]/10 hover:text-[#61c5a8] transition-colors">
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Results</p>
                    {searchResults.map(pkg => (
                      <Link 
                        key={pkg.id} 
                        to={`/packages/${pkg.id}`} 
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group"
                      >
                        <img src={pkg.heroImage} alt={pkg.title} className="w-16 h-16 rounded-xl object-cover" />
                        <div>
                          <h4 className="font-bold text-slate-900 group-hover:text-[#61c5a8] transition-colors">{pkg.title}</h4>
                          <p className="text-sm text-slate-500 font-medium flex items-center gap-1"><MapPin className="w-3 h-3" /> {pkg.location}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-500 font-medium text-lg">No trips found matching "{searchQuery}"</p>
                    <p className="text-sm text-slate-400 mt-2">Try searching for a different location or keyword.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[90] bg-white lg:hidden flex flex-col"
          >
            {/* Mobile Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#61c5a8]/50 shadow-md flex-shrink-0">
                  <img src={logoImg} alt="Travelling Partners Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#8b5a2b] uppercase font-bold tracking-widest leading-none mb-1">Escape With</span>
                  <span className="text-xl font-black text-slate-900 tracking-tight leading-none">
                    TRAVELLING PARTNERS
                  </span>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 bg-slate-100 hover:bg-slate-200 transition-colors rounded-full">
                <X className="w-6 h-6 text-slate-900" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col flex-grow p-6 overflow-y-auto">
              <Link to="/" className="text-2xl font-black text-slate-800 py-4 border-b border-slate-100" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>

              {/* Mobile Packages Accordion */}
              <div className="border-b border-slate-100">
                <button 
                  onClick={() => setMobilePackagesOpen(!mobilePackagesOpen)}
                  className="w-full flex justify-between items-center text-2xl font-black text-slate-800 py-4"
                >
                  Destinations
                  <ChevronDown className={`w-6 h-6 transition-transform ${mobilePackagesOpen ? 'rotate-180 text-[#61c5a8]' : 'text-slate-300'}`} />
                </button>
                <AnimatePresence>
                  {mobilePackagesOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="pl-2 pb-6 space-y-6">
                        {tripCategories.map(cat => {
                          const packages = getPackagesForCategory(cat.id);
                          if (packages.length === 0) return null;
                          return (
                            <div key={cat.id} className="space-y-3">
                              <p className="text-xs font-black text-slate-400 uppercase tracking-widest border-l-2 border-[#61c5a8] pl-2">{cat.label}</p>
                              <div className="grid grid-cols-1 gap-2">
                                {packages.map(pkg => (
                                  <Link 
                                    key={pkg.id} 
                                    to={`/packages/${pkg.id}`} 
                                    onClick={() => setMobileMenuOpen(false)} 
                                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 active:scale-[0.98]"
                                  >
                                    <img src={pkg.heroImage} alt={pkg.title} className="w-12 h-12 rounded-lg object-cover shadow-sm shrink-0" />
                                    <div className="flex flex-col overflow-hidden">
                                      <span className="text-sm font-bold text-slate-800 line-clamp-1">{pkg.title}</span>
                                      <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">{pkg.duration} • {pkg.location.split(',')[0]}</span>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                        <Link to="/packages" className="block text-center mt-6 text-[#61c5a8] font-bold bg-[#61c5a8]/10 py-3 rounded-xl" onClick={() => setMobileMenuOpen(false)}>
                          View All Expeditions
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Company Accordion */}
              <div className="border-b border-slate-100">
                <button 
                  onClick={() => setMobileInfoOpen(!mobileInfoOpen)}
                  className="w-full flex justify-between items-center text-2xl font-black text-slate-800 py-4"
                >
                  Company
                  <ChevronDown className={`w-6 h-6 transition-transform ${mobileInfoOpen ? 'rotate-180 text-[#61c5a8]' : 'text-slate-300'}`} />
                </button>
                <AnimatePresence>
                  {mobileInfoOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="pl-4 pb-4 space-y-4 pt-2">
                        <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-bold text-slate-600">
                          <Info className="w-5 h-5 text-slate-400" /> About Us
                        </Link>
                        <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-bold text-slate-600">
                          <Phone className="w-5 h-5 text-slate-400" /> Contact Support
                        </Link>
                        <Link to="/terms" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-lg font-bold text-slate-600">
                          <FileText className="w-5 h-5 text-slate-400" /> Terms & Conditions
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Mobile Footer CTA */}
            <div className="p-6 border-t border-slate-100 bg-slate-50 shrink-0 pb-8">
              <a 
                href={WA_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#25D366]/30 flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <MessageCircle className="w-6 h-6" /> WhatsApp Us Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
