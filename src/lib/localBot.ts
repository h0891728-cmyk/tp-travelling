import packagesData from './Packages.json';

const FAQS = [
  { keywords: ["custom", "personalize", "tailor"], answer: "Yes Sir/Ma'am, we specialize in creating 100% personalized itineraries. Please let us know your preferences!" },
  { keywords: ["beginner", "easy", "first time", "difficulty"], answer: "We offer Himalayan treks across all difficulty levels. Many are perfect for beginners, like the Jibhi Tirthan escape or beginner-friendly trekking routes." },
  { keywords: ["include", "char dham", "yatra", "premium"], answer: "Our premium Char Dham Yatra packages include accommodation, meals, transportation, and an expert trip captain. It is a fully guided spiritual journey." },
  { keywords: ["early", "book", "advance", "when"], answer: "We highly recommend booking at least 2-3 months in advance to get the best prices, Sir/Ma'am." },
  { keywords: ["price", "cost", "how much", "expensive"], answer: "Our package prices start from ₹9,500. You can browse all destinations on our Packages page to see specific costs!" },
];

export async function chatWithBot(userMessage: string, _history: any[] = []): Promise<string> {
  const msg = userMessage.toLowerCase();
  
  // Fake network delay for realism
  await new Promise(resolve => setTimeout(resolve, 800));

  // Greetings
  if (msg.includes("hi ") || msg === "hi" || msg.includes("hello") || msg.includes("namaste") || msg.includes("hey")) {
    return "Namaste! 🙏 Welcome to Travelling Partners. How can I help you plan your next adventure today, Sir/Ma'am?";
  }

  // Check FAQs first
  for (const faq of FAQS) {
    if (faq.keywords.some(kw => msg.includes(kw))) {
      return faq.answer;
    }
  }

  // Check Packages
  let foundPackages = packagesData.filter(p => 
    msg.includes(p.id.split('-').join(' ')) || 
    msg.includes(p.title.toLowerCase()) ||
    msg.includes(p.location.toLowerCase().split(',')[0])
  );

  // Broad package checks
  if (msg.includes("spiti")) foundPackages.push(...packagesData.filter(p => p.id.includes("spiti")));
  if (msg.includes("kashmir")) foundPackages.push(...packagesData.filter(p => p.id.includes("kashmir")));
  if (msg.includes("manali")) foundPackages.push(...packagesData.filter(p => p.id.includes("manali")));
  if (msg.includes("kedarnath") || msg.includes("dham")) foundPackages.push(...packagesData.filter(p => p.id.includes("dham") || p.id.includes("kedarnath")));

  // Deduplicate
  foundPackages = [...new Map(foundPackages.map(item => [item.id, item])).values()];

  if (foundPackages.length > 0) {
    const pkg = foundPackages[0];
    return `Sir/Ma'am, we have a wonderful package for that! 
**${pkg.title}** is a ${pkg.duration} trip starting at **${pkg.price}**. 

Highlights include:
- ${pkg.highlights.join('\n- ')}

Would you like me to connect you with an expert to book this?`;
  }

  // Default response
  return "I'm still learning, Sir/Ma'am! For detailed queries about exact dates or specific custom routes, kindly reach out to us from the Contact page and our human experts will be highly happy to assist you!";
}
