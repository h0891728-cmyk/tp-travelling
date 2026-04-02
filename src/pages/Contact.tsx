import React from 'react';
import { PhoneCall, Mail, MapPin, Clock, MessageSquare, MessageCircle } from 'lucide-react';
import { useMeta } from '../hooks/useMeta';

const WA_NUMBER = '917009736873';
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Hello! I have a query about a travel package.')}`;

const Contact = () => {
  useMeta({
    title: 'Contact Us',
    description: 'Get in touch with Travelling Partners. Call, WhatsApp, or email us for custom itineraries, group bookings, and pilgrimage packages. Delhi based — always reachable.',
    url: '/contact'
  });

  return (
    <div className="pt-28 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 md:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-black text-[#61c5a8] uppercase tracking-[0.3em] mb-3">We're Here For You</p>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">Get in Touch</h1>
          <div className="w-24 h-1.5 bg-[#61c5a8] mx-auto rounded-full" />
          <p className="mt-6 text-slate-500 font-medium max-w-2xl mx-auto text-lg">
            Planning a trip? Have questions about a package? Our travel team is ready to help — just reach out on any channel below.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              title: 'Call Us',
              icon: PhoneCall,
              info: '+91 70097 36873',
              desc: 'Mon–Sat, 9 AM – 7 PM IST',
              href: 'tel:+917009736873',
              color: 'text-[#61c5a8]',
              bg: 'bg-[#61c5a8]/10'
            },
            {
              title: 'WhatsApp',
              icon: MessageCircle,
              info: '+91 70097 36873',
              desc: 'Quick response guaranteed',
              href: WA_URL,
              color: 'text-green-500',
              bg: 'bg-green-50'
            },
            {
              title: 'Email Us',
              icon: Mail,
              info: 'contact@travellingpartners.in',
              desc: 'Response within 24 hours',
              href: 'mailto:contact@travellingpartners.in',
              color: 'text-blue-500',
              bg: 'bg-blue-50'
            },
            {
              title: 'Our Location',
              icon: MapPin,
              info: 'Delhi NCR, India',
              desc: 'Trips depart from Delhi',
              href: 'https://maps.google.com/?q=Delhi,India',
              color: 'text-rose-500',
              bg: 'bg-rose-50'
            },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-[#61c5a8]/20 transition-all text-center group"
            >
              <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-5 mx-auto group-hover:scale-110 transition-transform`}>
                <item.icon className={`w-7 h-7 ${item.color}`} />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
              <p className={`${item.color} font-bold text-sm mb-1 break-all`}>{item.info}</p>
              <p className="text-slate-400 text-xs font-medium">{item.desc}</p>
            </a>
          ))}
        </div>

        {/* Office Hours */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#61c5a8]/10 rounded-xl flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#61c5a8]" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Office Hours</h2>
            </div>
            <div className="space-y-3">
              {[
                { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
                { day: 'Saturday',        time: '9:00 AM – 6:00 PM' },
                { day: 'Sunday',          time: 'WhatsApp only' },
              ].map((row, i) => (
                <div key={i} className="flex justify-between items-center py-2.5 border-b border-slate-50 last:border-0">
                  <span className="text-sm font-bold text-slate-700">{row.day}</span>
                  <span className="text-sm font-black text-[#61c5a8]">{row.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-amber-500" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Quick Message</h2>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-5">
              The fastest way to reach us is WhatsApp. We reply within minutes during business hours.
            </p>
            <div className="space-y-3">
              {[
                { msg: 'Book a package', text: 'Hi! I want to book a travel package with Travelling Partners.' },
                { msg: 'Custom itinerary', text: 'Hi! I need a custom itinerary for my group.' },
                { msg: 'General inquiry', text: 'Hello! I have a question about your packages.' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(item.text)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-slate-50 hover:bg-[#61c5a8]/5 border border-slate-100 hover:border-[#61c5a8]/30 px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:text-[#61c5a8] transition-all group"
                >
                  <MessageCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {item.msg}
                  <span className="ml-auto text-slate-400 group-hover:text-[#61c5a8] text-xs">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-slate-900 rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#61c5a8]/5 rounded-full -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#61c5a8]/5 rounded-full -ml-20 -mb-20 pointer-events-none" />
          <h2 className="text-3xl font-black text-white mb-3 relative z-10">Prefer a direct conversation?</h2>
          <p className="text-slate-400 text-base font-medium mb-8 max-w-xl mx-auto relative z-10">
            Our travel consultants are ready to discuss your requirements and create a personalized itinerary just for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-white px-8 py-4 rounded-full font-bold shadow-lg transition-all active:scale-95"
            >
              <MessageCircle className="w-5 h-5" /> Chat on WhatsApp
            </a>
            <a
              href="tel:+917009736873"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-full font-bold transition-all"
            >
              <PhoneCall className="w-5 h-5" /> +91 70097 36873
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
