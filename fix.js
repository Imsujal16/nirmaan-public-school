const fs = require('fs');
const files = ['index.html', 'about.html', 'academics.html', 'admissions.html', 'contact.html'];
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/ðŸŽ“/g, '🎓');
  c = c.replace(/â€”/g, '—');
  c = c.replace(/â†’/g, '→');
  c = c.replace(/Â·/g, '·');
  fs.writeFileSync(f, c, 'utf8');
});
