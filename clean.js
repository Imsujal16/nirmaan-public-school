const fs = require('fs');

const files = ['index.html', 'about.html', 'academics.html', 'admissions.html', 'contact.html'];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');

  // Regex replace all occurrences since we know the mapping now
  c = c.replace(/ðŸ  /g, '🏠');
  c = c.replace(/â„¹ï¸ /g, 'ℹ️');
  c = c.replace(/ðŸ“š/g, '📚');
  c = c.replace(/ðŸ“ /g, '🎓');
  c = c.replace(/ðŸ“ž/g, '📞');
  c = c.replace(/ðŸ“</g, '📝');
  c = c.replace(/ðŸ \u008fï¸ /g, '🏛️'); // Sometimes motto icon
  c = c.replace(/ðŸ”¥/g, '🔥');
  
  c = c.replace(/ð/g, ''); // Clear any lingering broken eth
  c = c.replace(/â/g, ''); // Clear any lingering broken a-circumflex

  fs.writeFileSync(f, c, 'utf8');
});
console.log('Fixed all remaining chars');
