import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, ChevronDown, ShieldCheck, XCircle, CreditCard,
  AlertTriangle, Clock, Phone, Globe, Users, Mountain, Scroll
} from 'lucide-react';
import { useMeta } from '../hooks/useMeta';

const LAST_UPDATED = 'April 2, 2026';
const COMPANY_NAME = 'Travelling Partners';
const CONTACT_EMAIL = 'contact@travellingpartners.in';
const CONTACT_PHONE = '+91 70097 36873';
const WHATSAPP = 'https://wa.me/917009736873';

interface Section {
  id: string;
  icon: React.ElementType;
  title: string;
  color: string;
  content: { heading?: string; text: string }[];
}

const SECTIONS: Section[] = [
  {
    id: 'booking',
    icon: CreditCard,
    title: 'Booking & Payment Policy',
    color: 'text-[#61c5a8]',
    content: [
      {
        heading: 'Confirmation',
        text: 'A booking is confirmed only upon receipt of the advance payment and written confirmation from Travelling Partners via WhatsApp or email. Verbal confirmations are not binding.'
      },
      {
        heading: 'Advance Payment',
        text: 'An advance of 30–50% of the total package cost is required to block your seat. The remaining balance must be paid at least 7 days before departure, unless otherwise specified in writing.'
      },
      {
        heading: 'Payment Modes',
        text: 'We accept UPI (GPay, PhonePe, Paytm), bank transfer (NEFT/RTGS/IMPS), and cash. All payments must be made to the official Travelling Partners account. Do not transfer to any personal account.'
      },
      {
        heading: 'Price Validity',
        text: 'Prices are quoted at the time of booking and are subject to change due to fuel price revisions, government taxes, seasonal surcharges, or currency fluctuations. Any increase will be communicated before confirmation.'
      },
    ]
  },
  {
    id: 'cancellation',
    icon: XCircle,
    title: 'Cancellation & Refund Policy',
    color: 'text-rose-500',
    content: [
      {
        heading: 'Cancellation by Participant',
        text: 'Cancellations must be made in writing to our official email or WhatsApp. Verbal cancellations will not be accepted or processed.'
      },
      {
        heading: 'Cancellation Charges',
        text: '• 30+ days before departure: 10% of total cost deducted\n• 15–29 days before departure: 25% of total cost deducted\n• 7–14 days before departure: 50% of total cost deducted\n• Less than 7 days / No-show: 100% forfeiture (no refund)'
      },
      {
        heading: 'Refund Processing',
        text: 'Approved refunds are processed within 7–14 working days via the original payment method. GST and payment gateway charges (if any) are non-refundable.'
      },
      {
        heading: 'Cancellation by Travelling Partners',
        text: 'In the rare event that we cancel a trip due to insufficient group size, natural disasters, government restrictions, or force majeure, a full refund of the amount paid will be issued within 10 working days, or an alternate date/trip will be offered.'
      },
    ]
  },
  {
    id: 'itinerary',
    icon: Mountain,
    title: 'Itinerary & Trip Changes',
    color: 'text-indigo-500',
    content: [
      {
        heading: 'Itinerary Flexibility',
        text: 'The itinerary is indicative and not guaranteed. Travelling Partners reserves the right to modify routes, accommodation, or activities without prior notice if required for safety, weather conditions, road closures, or operational reasons.'
      },
      {
        heading: 'Weather & Road Conditions',
        text: 'High-altitude trips in the Himalayas are heavily dependent on weather and road conditions. Snow closures, landslides, or government restrictions may alter the route. No refund will be issued for itinerary changes caused by such factors.'
      },
      {
        heading: 'Accommodation',
        text: 'Accommodation is on a twin/triple-sharing basis unless specifically booked otherwise. Hotel/homestay categories are as described at the time of booking but may be substituted with equivalent alternatives at our discretion.'
      },
      {
        heading: 'Extra Nights',
        text: 'If extra nights are required due to weather, vehicle breakdown, or road blockages, the cost of the same shall be borne by the participants equally.'
      },
    ]
  },
  {
    id: 'health',
    icon: ShieldCheck,
    title: 'Health, Fitness & Safety',
    color: 'text-emerald-500',
    content: [
      {
        heading: 'Medical Fitness',
        text: 'Participants are required to disclose any medical conditions, allergies, or disabilities at the time of booking. High-altitude and trekking packages require participants to be in good cardiovascular health. Travelling Partners reserves the right to deny participation if we believe it poses a risk to the individual or the group.'
      },
      {
        heading: 'Altitude Sickness',
        text: 'Altitude sickness (AMS) is a real risk on high-altitude trips. We carry basic first-aid and Diamox as a precaution, but participants should consult a doctor before the trip. In the event of severe AMS, participants may be evacuated at their own cost.'
      },
      {
        heading: 'Travel Insurance',
        text: 'Travel insurance covering high-altitude trekking and medical evacuation is strongly recommended. Travelling Partners does not provide insurance; however, we can assist with guidance on appropriate policies.'
      },
      {
        heading: 'Safety Protocols',
        text: 'Our trip leaders and guides are trained in first aid and wilderness safety. Participants must follow all safety instructions given by the trip leader. Disregard of safety protocols may result in immediate removal from the trip without refund.'
      },
    ]
  },
  {
    id: 'liability',
    icon: AlertTriangle,
    title: 'Liability & Disclaimer',
    color: 'text-amber-500',
    content: [
      {
        heading: 'Limitation of Liability',
        text: 'Travelling Partners acts as a tour organiser and is not liable for any loss, injury, damage, or death arising from participation in any trip. Participants undertake all activities at their own risk.'
      },
      {
        heading: 'Third-Party Services',
        text: 'We coordinate with third-party hotels, transport operators, local guides, and airlines. We are not responsible for the actions, negligence, or quality of services provided by these entities.'
      },
      {
        heading: 'Force Majeure',
        text: 'Travelling Partners is not liable for any failure to perform its obligations arising from events beyond our control, including natural disasters, pandemics, war, civil unrest, government orders, or infrastructure failure.'
      },
      {
        heading: 'Personal Belongings',
        text: 'Travelling Partners is not responsible for loss or damage to personal belongings, equipment, or luggage during the trip. Participants are advised to keep valuables secure and purchase appropriate insurance.'
      },
    ]
  },
  {
    id: 'conduct',
    icon: Users,
    title: 'Code of Conduct',
    color: 'text-blue-500',
    content: [
      {
        heading: 'Group Responsibility',
        text: 'All participants are expected to behave respectfully toward fellow travellers, local communities, and the environment. Aggressive, abusive, or disruptive behaviour will not be tolerated and may result in removal from the trip without refund.'
      },
      {
        heading: 'Substance Use',
        text: 'Consumption of alcohol or drugs before or during trekking, high-altitude driving, or adventure activities is strictly prohibited. Travelling Partners reserves the right to remove any participant found violating this rule.'
      },
      {
        heading: 'Environmental Responsibility',
        text: 'We operate under a strict Leave No Trace policy. Littering, damaging flora/fauna, or disrespecting sacred sites is absolutely prohibited. Participants are expected to carry and dispose of their waste responsibly.'
      },
      {
        heading: 'Photography & Social Media',
        text: 'Participants grant Travelling Partners permission to use any photographs or footage captured during the trip for promotional purposes. If you wish to opt out, please inform us in writing before the trip.'
      },
    ]
  },
  {
    id: 'inclusions',
    icon: Clock,
    title: 'Inclusions & Exclusions',
    color: 'text-violet-500',
    content: [
      {
        heading: 'Standard Inclusions',
        text: 'Each package clearly defines what is included. Generally, this covers accommodation, meals as specified, transportation during the trip, a trip leader/guide, and permits as mentioned in the package details.'
      },
      {
        heading: 'Standard Exclusions',
        text: 'Unless explicitly stated, the following are excluded from all packages: 5% GST, airfare/train tickets to/from the origin city, personal expenses, tips, entry fees, adventure activities not listed, pony/porter charges, medical/evacuation costs, and any cost arising from itinerary changes.'
      },
      {
        heading: 'Custom Packages',
        text: 'Custom or private group bookings are governed by their own specific inclusions and exclusions agreed upon in writing before confirmation. The standard T&C still apply for cancellation and liability.'
      },
    ]
  },
  {
    id: 'legal',
    icon: Globe,
    title: 'Governing Law & Disputes',
    color: 'text-slate-500',
    content: [
      {
        heading: 'Jurisdiction',
        text: `These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Delhi, India.`
      },
      {
        heading: 'Dispute Resolution',
        text: 'In the event of a dispute, both parties agree to first attempt resolution through good-faith negotiation. If unresolved within 30 days, the dispute shall be referred to binding arbitration as per the Arbitration and Conciliation Act, 1996.'
      },
      {
        heading: 'Amendments',
        text: 'Travelling Partners reserves the right to modify these Terms and Conditions at any time. Updated terms will be published on our website and communicated to participants. Continued participation in our services constitutes acceptance of the revised terms.'
      },
    ]
  },
];

const AccordionItem = ({ section }: { section: Section }) => {
  const [open, setOpen] = useState(false);
  const Icon = section.icon;

  return (
    <motion.div
      layout
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left gap-4"
      >
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0 ${section.color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className="text-lg font-black text-slate-900">{section.title}</span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-slate-100 pt-5">
              {section.content.map((item, i) => (
                <div key={i}>
                  {item.heading && (
                    <h4 className="text-sm font-black text-slate-900 uppercase tracking-wide mb-2 flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full bg-current ${section.color}`} />
                      {item.heading}
                    </h4>
                  )}
                  <p className="text-slate-600 text-sm leading-relaxed font-medium whitespace-pre-line pl-3.5">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Terms = () => {
  useMeta({
    title: 'Terms & Conditions',
    description: 'Read Travelling Partners\u2019 booking policy, cancellation charges, refund terms, health & safety guidelines, liability disclaimer and code of conduct for all trips.',
    url: '/terms'
  });
  return (
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* Hero */}
      <div className="relative bg-slate-900 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, #61c5a8 0%, transparent 60%), radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%)'
        }} />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#61c5a8]/20 border border-[#61c5a8]/30 px-4 py-2 rounded-full text-[#61c5a8] text-xs font-black uppercase tracking-widest mb-6"
          >
            <Scroll className="w-4 h-4" /> Legal Document
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight"
          >
            Terms & Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg font-medium max-w-2xl mx-auto"
          >
            Please read these terms carefully before booking any trip with Travelling Partners. By booking, you agree to these terms.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-[#61c5a8]" /> Last Updated: {LAST_UPDATED}</span>
            <span className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-[#61c5a8]" /> Governed by Laws of India</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#61c5a8]" /> {COMPANY_NAME}</span>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">

        {/* Quick Nav Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {SECTIONS.slice(0, 4).map(s => {
            const Icon = s.icon;
            return (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md hover:border-[#61c5a8]/30 transition-all group text-center"
                onClick={e => {
                  e.preventDefault();
                  document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Icon className={`w-6 h-6 mx-auto mb-2 ${s.color} group-hover:scale-110 transition-transform`} />
                <span className="text-xs font-bold text-slate-700 leading-tight block">{s.title.split(' ')[0]}</span>
              </a>
            );
          })}
        </div>

        {/* Intro Box */}
        <div className="bg-[#61c5a8]/5 border border-[#61c5a8]/20 rounded-2xl p-6 mb-8">
          <h2 className="text-base font-black text-slate-900 mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#61c5a8]" /> Agreement to Terms
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            By booking any trip or service with <strong>Travelling Partners</strong> — whether via WhatsApp, email, or our website — you acknowledge that you have read, understood, and agree to be bound by the following Terms and Conditions. These terms apply to all participants including the lead booker and all members of the travel party.
          </p>
        </div>

        {/* Accordion Sections */}
        <div className="space-y-4 mb-10">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <AccordionItem section={section} />
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-slate-900 rounded-3xl p-8 text-center">
          <Phone className="w-10 h-10 text-[#61c5a8] mx-auto mb-4" />
          <h3 className="text-2xl font-black text-white mb-2">Have Questions?</h3>
          <p className="text-slate-400 text-sm font-medium mb-6 max-w-md mx-auto">
            If you have any questions about these Terms and Conditions or our policies, please don't hesitate to reach out to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#25D366]/20 active:scale-95"
            >
              <Phone className="w-4 h-4" /> Chat on WhatsApp
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm transition-all"
            >
              <Globe className="w-4 h-4" /> {CONTACT_EMAIL}
            </a>
          </div>
          <p className="text-slate-600 text-xs mt-4 font-medium">
            {CONTACT_PHONE} · Monday–Saturday, 9:00 AM – 7:00 PM IST
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-400 font-medium mt-8">
          © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved. These terms are subject to change without prior notice.
        </p>
      </div>
    </div>
  );
};

export default Terms;
