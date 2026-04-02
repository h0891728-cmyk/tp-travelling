import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin, Clock, Star, ArrowLeft, Tag, Download, MessageCircle,
  Mountain, CheckCircle2, XCircle, Navigation, Info, Snowflake
} from 'lucide-react';
import packagesData from '../lib/Packages.json';
import { useMeta } from '../hooks/useMeta';

const WA_NUMBER = '917009736873';

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = packagesData.find(p => p.id === id);

  // Dynamic SEO for each package
  useMeta({
    title: pkg ? `${pkg.title} — ${(pkg as any).duration || ''}` : 'Package Details',
    description: pkg
      ? `${pkg.title} in ${pkg.location}. ${(pkg as any).story?.substring(0, 140) || ''}`
      : 'Travelling Partners — Himalayan travel packages',
    image: pkg?.heroImage,
    url: `/packages/${id}`,
    type: 'article'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pkg]);

  const handleDownloadPDF = () => {
    if (!pkg) return;
    const p = pkg as any;
    const waMsg = encodeURIComponent(`Hi! I downloaded the itinerary for "${pkg.title}". Please share availability and booking details.`);

    const rows = (pkg.itinerary || []).map((d: any) =>
      `<div class="day"><span class="badge">${d.day}</span><div class="dt">${d.title}</div><div class="dd">${d.desc}</div></div>`
    ).join('');

    const inc = (pkg.inclusions || []).map((i: string) => `<div class="ic">✓ ${i}</div>`).join('');
    const exc = (pkg.exclusions || []).map((e: string) => `<div class="ex">✗ ${e}</div>`).join('');
    const hi  = (pkg.highlights  || []).map((h: string) => `<span class="tag">★ ${h}</span>`).join('');

    const html = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<title>${pkg.title} – Itinerary | Travelling Partners</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;color:#1e293b;background:#fff;padding:36px}
@media print{body{padding:18px}}
h1{font-size:24px;font-weight:900;color:#0f172a;margin:6px 0 4px}
.brand{font-size:10px;color:#61c5a8;font-weight:900;letter-spacing:3px;text-transform:uppercase}
.meta{display:flex;gap:14px;flex-wrap:wrap;font-size:12px;color:#64748b;font-weight:600;margin-top:6px}
.hdr{border-bottom:3px solid #61c5a8;padding-bottom:16px;margin-bottom:20px}
.pbox{background:#f0fdf9;border:2px solid #61c5a8;border-radius:10px;padding:14px 18px;margin:16px 0;display:flex;justify-content:space-between;align-items:center}
.plabel{font-size:9px;font-weight:900;text-transform:uppercase;letter-spacing:2px;color:#64748b}
.price{font-size:24px;font-weight:900;color:#61c5a8}
.sec{font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:1px;border-left:4px solid #61c5a8;padding-left:9px;margin:20px 0 12px;color:#0f172a}
.day{margin-bottom:14px;padding:13px;border:1px solid #e2e8f0;border-radius:9px;page-break-inside:avoid}
.badge{display:inline-block;background:#61c5a8;color:#fff;font-size:10px;font-weight:900;padding:2px 9px;border-radius:5px;letter-spacing:1px;text-transform:uppercase;margin-bottom:5px}
.dt{font-size:14px;font-weight:800;color:#0f172a;margin-bottom:4px}
.dd{font-size:12px;color:#475569;line-height:1.6}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:14px}
.ic{font-size:11px;color:#14532d;background:#f0fdf4;padding:6px 10px;border-radius:6px;margin-bottom:4px}
.ex{font-size:11px;color:#7f1d1d;background:#fff1f2;padding:6px 10px;border-radius:6px;margin-bottom:4px}
.tag{display:inline-block;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:5px;font-size:10px;font-weight:700;padding:3px 8px;margin:2px;color:#334155}
.foot{margin-top:32px;padding-top:14px;border-top:2px solid #e2e8f0;text-align:center;font-size:10px;color:#94a3b8;font-weight:600}
</style></head><body>
<div class="hdr">
  <div class="brand">Travelling Partners</div>
  <h1>${pkg.title}</h1>
  <div class="meta"><span>📍 ${pkg.location}</span><span>⏱ ${pkg.duration}</span>${p.category ? `<span>🏷 ${p.category}</span>` : ''}</div>
</div>
<div class="pbox">
  <div>
    <div class="plabel">Package Price / person</div>
    ${p.originalPrice ? `<div style="text-decoration:line-through;color:#94a3b8;font-size:12px">${p.originalPrice}</div>` : ''}
    <div class="price">${pkg.price}</div>
  </div>
  <div style="text-align:right;font-size:11px;color:#64748b;font-weight:700">
    <div>📞 +91 70097 36873</div><div>✉ contact@travellingpartners.in</div>
  </div>
</div>
${pkg.story ? `<div class="sec">Overview</div><p style="font-size:12px;color:#475569;line-height:1.8;margin-bottom:14px">${pkg.story}</p>` : ''}
${hi ? `<div class="sec">Highlights</div><div style="margin-bottom:12px">${hi}</div>` : ''}
<div class="sec">Day-by-Day Itinerary</div>
${rows}
<div class="cols">
  <div><div class="sec">Inclusions</div>${inc}</div>
  <div><div class="sec">Exclusions</div>${exc}</div>
</div>
<div class="foot">
  <strong>Travelling Partners</strong> · Authentic Himalayan Experiences<br>
  WhatsApp +91 70097 36873 · contact@travellingpartners.in<br>
  <em>Itinerary may change due to weather or operational reasons.</em>
</div>
</body></html>`;

    const pw = window.open('', '_blank', 'width=920,height=720');
    if (pw) {
      pw.document.write(html);
      pw.document.close();
      pw.focus();
      setTimeout(() => {
        pw.print();
        setTimeout(() => {
          window.open(`https://wa.me/${WA_NUMBER}?text=${waMsg}`, '_blank');
        }, 1800);
      }, 600);
    }
  };

  if (!pkg) return <div className="pt-32 text-center">Package not found</div>;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="bg-slate-50 min-h-screen pb-24">
      {/* Detail Hero */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <img src={pkg.heroImage} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20 pt-32">
           <button onClick={() => navigate(-1)} className="bg-slate-900/40 hover:bg-slate-900/60 backdrop-blur-md border border-white/10 p-3 rounded-full transition-all group">
             <ArrowLeft className="text-white group-hover:-translate-x-1 transition-transform" />
           </button>
        </div>

        <div className="absolute bottom-0 left-0 w-full px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-[#61c5a8] text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg">
                <Clock className="w-4 h-4" /> {pkg.duration}
              </span>
              <span className="bg-white/20 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 border border-white/30 shadow-lg">
                <MapPin className="w-4 h-4" /> {pkg.location}
              </span>
              {(pkg as any).category && (
                <span className="bg-amber-400/90 backdrop-blur-md text-slate-900 px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 shadow-lg">
                  <Tag className="w-4 h-4" /> {(pkg as any).category}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-xl">{pkg.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          <div className="w-full lg:w-2/3 space-y-12 bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-slate-100">
            <section>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Info className="w-8 h-8 text-[#61c5a8]" /> Overview
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">{pkg.story}</p>
              
              <div className="mt-8 flex flex-wrap gap-3">
                {pkg.highlights?.map((h: string, i: number) => (
                  <span key={i} className="bg-slate-50 border border-slate-200 text-slate-800 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-[#61c5a8]/5 hover:border-[#61c5a8]/30 transition-colors">
                    <Star className="w-4 h-4 text-[#61c5a8] fill-[#61c5a8]" /> {h}
                  </span>
                ))}
              </div>
            </section>

            <hr className="border-slate-100" />

            <section>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-10 flex items-center gap-3">
                <Navigation className="w-8 h-8 text-[#61c5a8]" /> Route & Itinerary
              </h2>
              
              <div className="relative">
                <div className="absolute left-[27px] top-[40px] bottom-[40px] w-[3px] bg-slate-200 rounded-full"></div>
                <div className="space-y-12">
                  {pkg.itinerary?.map((day: any, idx: number) => {
                    const isFirst = idx === 0;
                    const isLast = idx === pkg.itinerary.length - 1;

                    return (
                      <div key={idx} className="relative pl-20 group">
                        <div className="absolute left-0 top-0 w-14 h-14 flex items-center justify-center bg-white z-10">
                          {isFirst ? (
                            <div className="w-10 h-10 rounded-full bg-[#61c5a8] text-white flex items-center justify-center shadow-lg shadow-[#61c5a8]/40 ring-4 ring-white group-hover:scale-110 transition-transform">
                              <Navigation className="w-5 h-5" />
                            </div>
                          ) : isLast ? (
                            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/40 ring-4 ring-white group-hover:scale-110 transition-transform">
                              <CheckCircle2 className="w-5 h-5" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-white border-[3px] border-[#61c5a8] shadow-md ring-4 ring-white group-hover:bg-[#61c5a8] transition-colors duration-300"></div>
                          )}
                        </div>
                        
                        <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 hover:border-[#61c5a8]/30 hover:shadow-xl hover:shadow-[#61c5a8]/5 transition-all duration-300 overflow-hidden relative">
                          <div className="flex flex-col xl:flex-row gap-8 relative z-10">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-sm font-black text-white bg-[#61c5a8] px-3 py-1 rounded-lg tracking-widest uppercase shadow-sm">
                                  {day.day}
                                </span>
                              </div>
                              <h3 className="text-2xl font-bold text-slate-900 mb-4 leading-tight">{day.title}</h3>
                              <p className="text-slate-600 leading-relaxed font-medium text-lg">{day.desc}</p>
                            </div>
                            
                            {day.image && (
                              <div className="w-full xl:w-[45%] shrink-0">
                                <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-md border border-white/50 bg-white">
                                  <img 
                                    src={day.image} 
                                    alt={day.title} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                    loading="lazy"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>

            <hr className="border-slate-100" />

            <section className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#61c5a8]/5 p-8 rounded-3xl border border-[#61c5a8]/20 relative overflow-hidden">
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 relative z-10">
                  <CheckCircle2 className="text-[#61c5a8] w-7 h-7" /> Included
                </h3>
                <ul className="space-y-5 relative z-10">
                  {pkg.inclusions?.map((inc: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#61c5a8] mt-1" strokeWidth={3} />
                      <span className="text-lg">{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-red-50 p-8 rounded-3xl border border-red-100 relative overflow-hidden">
                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3 relative z-10">
                  <XCircle className="text-red-400 w-7 h-7" /> Excluded
                </h3>
                <ul className="space-y-5 relative z-10">
                  {pkg.exclusions?.map((exc: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700 font-medium">
                      <XCircle className="w-4 h-4 text-red-400 mt-1" strokeWidth={3} />
                      <span className="text-lg">{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

          </div>

          <div className="w-full lg:w-1/3">
            <div className="sticky top-28 bg-white p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.06)] border border-slate-100">
               <div className="bg-slate-50 -mx-8 -mt-8 p-8 rounded-t-3xl border-b border-slate-100 mb-8">
                 {(pkg as any).originalPrice && (
                   <div className="mb-2 flex items-center gap-2">
                     <span className="bg-rose-100 text-rose-600 text-xs font-black px-2.5 py-1 rounded-full uppercase tracking-wider">Special Offer</span>
                     <span className="text-slate-400 line-through text-base font-semibold">{(pkg as any).originalPrice}</span>
                   </div>
                 )}
                 <div className="flex justify-between items-end">
                   <div>
                     <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Total Package Cost</p>
                     <p className="text-5xl font-black text-slate-900 tracking-tight">{pkg.price}</p>
                   </div>
                   <span className="text-sm font-bold text-slate-500 pb-2">/ person</span>
                 </div>
               </div>
               
               <div className="space-y-4 mb-8">
                 <div className="flex items-center gap-4 text-slate-700 font-bold bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                   <Clock className="w-6 h-6 text-[#61c5a8]" />
                   <div>
                     <p className="text-sm text-slate-400">Availability</p>
                     <p>Fixed Departures</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 text-slate-700 font-bold bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                   {pkg.title?.toLowerCase().includes('winter') ? <Snowflake className="w-6 h-6 text-[#61c5a8]" /> : <Mountain className="w-6 h-6 text-[#61c5a8]" />}
                   <div>
                     <p className="text-sm text-slate-400">Terrain Type</p>
                     <p>High Altitude / Adventure</p>
                   </div>
                 </div>
               </div>

                <div className="space-y-3 mt-2">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full flex items-center justify-center gap-2.5 border-2 border-[#61c5a8] text-[#61c5a8] hover:bg-[#61c5a8] hover:text-white py-4 rounded-2xl font-black text-base transition-all active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5" /> Download Itinerary (PDF)
                  </button>
                  <a
                    href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in the ${pkg.title} package. Please share availability and booking details.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white py-4 rounded-2xl font-black text-base transition-all active:scale-[0.98] shadow-lg shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-5 h-5" /> Book on WhatsApp
                  </a>
                </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

export default PackageDetails;
