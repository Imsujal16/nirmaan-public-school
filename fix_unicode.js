const fs = require('fs');

const mappings = {
  // Navigation
  'ðŸ  ': '🏠',
  'â„¹ï¸ ': 'ℹ️',
  'ðŸ“š': '📚',
  'ðŸ“ ': '🎓',
  'ðŸ“ž': '📞',
  'ðŸ“ ': '📝',
  
  // Activities / Stats
  'ðŸ’¡': '💡',
  'âš½': '⚽',
  'ðŸŽ¨': '🎨',
  'ðŸ”¬': '🔬',
  'ðŸ’»': '💻',
  'ðŸŽ­': '🎭',
  'ðŸ—£ï¸ ': '🗣️',
  'ðŸŒ±': '🌱',
  'ðŸ›ï¸ ': '🏛️',
  'ðŸ \u008fï¸ ': '🏛️',
  
  // Emojis
  'âœ…': '✅',
  'â ': '⭐',
  'â— ': '●',
  
  // Grades
  'ðŸ§¸': '🧸',
  'ðŸŒ¸': '🌸',
  'ðŸŒ»': '🌻',
  'ðŸŒ¼': '🌼',
  
  // Punctuation
  'â€“': '–',
  'â€”': '—',
  'â†’': '→',
  'Â·': '·'
};

const files = ['index.html', 'about.html', 'academics.html', 'admissions.html', 'contact.html', 'styles.css'];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  for (let [bad, good] of Object.entries(mappings)) {
    c = c.split(bad).join(good);
  }
  fs.writeFileSync(f, c, 'utf8');
  console.log('Fixed', f);
});
