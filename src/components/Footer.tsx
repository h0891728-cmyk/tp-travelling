import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ChevronRight, MessageCircle, Mountain, Sparkles, Map } from 'lucide-react';
import packagesData from '../lib/Packages.json';
import logoImg from '../logo.png';

const WHATSAPP_NUMBER = "917009736873";
const WA_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello! I'd like to plan a trip with Travelling Partners.")}`;

const Footer = () => {
  const pilgrimagePackages = (packagesData as any[]).filter(p => p.category === 'Pilgrimage' || p.category === 'Pilgrimage & Trekking').slice(0, 5);
  const trekkingPackages = (packagesData as any[]).filter(p => p.category === 'Trekking' || p.category === 'Expedition').slice(0, 5);

  return (
    <footer className="bg-slate-950 pt-16 pb-6 border-t border-slate-800/50 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#61c5a8]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Main Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 mb-12">

          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#61c5a8]/50 shadow-lg flex-shrink-0 group-hover:border-[#61c5a8] transition-colors">
                <img src={logoImg} alt="Travelling Partners" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-[9px] text-[#61c5a8] font-black uppercase tracking-[0.3em] leading-none mb-1">Escape With</div>
                <span className="text-lg font-black text-white tracking-tight leading-none">
                  TRAVELLING PARTNERS
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium max-w-xs">
              Authentic Himalayan experiences since 2019. From sacred pilgrimages to high-altitude treks — we craft journeys that stay with you forever.
            </p>

            <div className="flex gap-3 mb-6">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-slate-800 flex items-center justify-center text-slate-500 hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-slate-800 flex items-center justify-center text-slate-500 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/5 border border-slate-800 flex items-center justify-center text-slate-500 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all">
                <Twitter className="w-4 h-4" />
              </a>
            </div>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white px-5 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#25D366]/20 active:scale-95"
            >
              <MessageCircle className="w-4 h-4" /> Plan a Trip on WhatsApp
            </a>
          </div>

          {/* Pilgrimages */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.25em] mb-5 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Pilgrimages
            </h4>
            <ul className="space-y-3">
              {pilgrimagePackages.map((pkg: any) => (
                <li key={pkg.id}>
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="text-slate-400 hover:text-[#61c5a8] text-sm font-medium transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-[#61c5a8] flex-shrink-0 transition-colors" />
                    <span className="line-clamp-1">{pkg.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/category/spiritual" className="text-[#61c5a8] text-xs font-black hover:text-white transition-colors flex items-center gap-1">
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          {/* Treks & Expeditions */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.25em] mb-5 flex items-center gap-2">
              <Mountain className="w-3.5 h-3.5 text-[#61c5a8]" /> Treks & Expeds
            </h4>
            <ul className="space-y-3">
              {trekkingPackages.map((pkg: any) => (
                <li key={pkg.id}>
                  <Link
                    to={`/packages/${pkg.id}`}
                    className="text-slate-400 hover:text-[#61c5a8] text-sm font-medium transition-colors flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-[#61c5a8] flex-shrink-0 transition-colors" />
                    <span className="line-clamp-1">{pkg.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/category/adventure" className="text-[#61c5a8] text-xs font-black hover:text-white transition-colors flex items-center gap-1">
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Links */}
          <div>
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.25em] mb-5 flex items-center gap-2">
              <Map className="w-3.5 h-3.5 text-rose-400" /> Connect
            </h4>

            <div className="space-y-4 mb-6">
              <a href="tel:+917009736873" className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-[#61c5a8] transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#61c5a8]" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-600 font-black uppercase tracking-wider mb-0.5">Call / WhatsApp</div>
                  <span className="text-xs font-black">+91 70097 36873</span>
                </div>
              </a>

              <a href="mailto:contact@travellingpartners.in" className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-slate-800 flex items-center justify-center shrink-0 group-hover:border-[#61c5a8] transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#61c5a8]" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-600 font-black uppercase tracking-wider mb-0.5">Email Us</div>
                  <span className="text-xs font-black">contact@travellingpartners.in</span>
                </div>
              </a>

              <div className="flex items-start gap-3 text-slate-500">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-slate-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#61c5a8]" />
                </div>
                <div>
                  <div className="text-[9px] text-slate-600 font-black uppercase tracking-wider mb-0.5">Based In</div>
                  <span className="text-xs font-black">Delhi NCR, India</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-900">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/packages', label: 'All Packages' },
                { to: '/terms', label: 'Travel Policy' },
              ].map(link => (
                <Link key={link.to} to={link.to} className="block text-slate-500 hover:text-[#61c5a8] text-xs font-semibold transition-colors py-0.5">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] font-bold text-slate-600">
            © {new Date().getFullYear()} Travelling Partners · Authentic Himalayan Experiences · Made with ❤️ in India
          </p>
          <div className="flex gap-5 text-[10px] font-black text-slate-600 uppercase tracking-widest">
            <Link to="/terms" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/packages" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;