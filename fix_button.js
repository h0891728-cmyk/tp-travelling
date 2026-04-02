const fs = require('fs');
let content = fs.readFileSync('src/pages/PackageDetails.tsx', 'utf8');

// Find and replace the old button block
const regex = /<button className="w-full bg-\[#61c5a8\] text-white py-5 rounded-2xl font-black text-xl hover:bg-\[#4ea88f\] transition-all active:scale-\[0.98\]">\s*Book This Trip Now\s*<\/button>/s;

const newBtns = `<div className="space-y-3">
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full flex items-center justify-center gap-2.5 border-2 border-[#61c5a8] text-[#61c5a8] hover:bg-[#61c5a8] hover:text-white py-4 rounded-2xl font-black text-base transition-all active:scale-[0.98]"
                  >
                    <Download className="w-5 h-5" /> Download Itinerary (PDF)
                  </button>
                  <a
                    href={\`https://wa.me/\${WA_NUMBER}?text=\${encodeURIComponent(\`Hi! I'm interested in the \${pkg.title} package. Please share availability and booking details.\`)}\`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1db954] text-white py-4 rounded-2xl font-black text-base transition-all active:scale-[0.98] shadow-lg shadow-[#25D366]/20"
                  >
                    <MessageCircle className="w-5 h-5" /> Book on WhatsApp
                  </a>
                </div>`;

if (regex.test(content)) {
  content = content.replace(regex, newBtns);
  fs.writeFileSync('src/pages/PackageDetails.tsx', content, 'utf8');
  console.log('SUCCESS: Buttons replaced');
} else {
  console.log('Pattern not found');
  // Show surrounding context
  const idx = content.indexOf('Book This Trip Now');
  if (idx !== -1) {
    console.log('Found text at:', idx);
    console.log('Context:', JSON.stringify(content.slice(idx - 100, idx + 100)));
  }
}
