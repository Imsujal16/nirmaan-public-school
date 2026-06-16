const fs = require('fs');
const path = require('path');

const files = ['index.html', 'about.html', 'academics.html', 'admissions.html', 'contact.html', 'styles.css'];

const staticMappings = {
  // Punctuation
  'â€“': '–', // en-dash
  'â€”': '—', // em-dash
  'â†’': '→',
  'Â·': '·',
  
  // Emojis / other
  'âœ…': '✅',
  'â ': '⭐',
  'â— ': '●',
  'ðŸ§¸': '🧸',
  'ðŸŒ¸': '🌸',
  'ðŸŒ»': '🌻',
  'ðŸŒ¼': '🌼',
  'ðŸ”¥': '🔥'
};

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');

  // Dynamic extractions
  const extract = (regex) => {
    let m = c.match(regex);
    return m ? m[1] : null;
  };

  const navHome = extract(/class=\"nav-link\">(.*?) Home/);
  if (navHome && navHome.includes('ð')) c = c.split(navHome).join('🏠');

  const navAbout = extract(/class=\"nav-link.*?>(.*?) About/);
  if (navAbout && (navAbout.includes('â') || navAbout.includes('ð'))) c = c.split(navAbout).join('ℹ️');

  const navAcad = extract(/class=\"nav-link.*?>(.*?) Acad/);
  if (navAcad && navAcad.includes('ð')) c = c.split(navAcad).join('📚');

  const navAdmi = extract(/class=\"nav-link.*?>(.*?) Admi/);
  if (navAdmi && navAdmi.includes('ð')) c = c.split(navAdmi).join('🎓');

  const navCont = extract(/class=\"nav-link.*?>(.*?) Cont/);
  if (navCont && navCont.includes('ð')) c = c.split(navCont).join('📞');
  
  const navApply = extract(/class=\"nav-cta\">(.*?) Apply/);
  if (navApply && navApply.includes('ð')) c = c.split(navApply).join('📝');

  // Static replacements
  for (let [bad, good] of Object.entries(staticMappings)) {
    c = c.split(bad).join(good);
  }

  // Common activities / stats patterns
  // 💡 big icon
  const bigIcon = extract(/<div class=\"big\">(.*?)<\/div>/);
  if (bigIcon && bigIcon.includes('ð')) c = c.split(bigIcon).join('💡');
  
  // 🏛️ motto icon
  const mottoIcon = extract(/<div class=\"motto-icon\">(.*?)<\/div>/);
  if (mottoIcon && mottoIcon.includes('ð')) c = c.split(mottoIcon).join('🏛️');

  // Activity icons (assuming order or just replacing remaining ones)
  // Let's replace any remaining ðŸ... with some generic icon if we can't map exactly, but let's try mapping the specific ones:
  // Activity icons are inside <span class="activity-icon">...</span>
  let activityMatches = [...c.matchAll(/class=\"activity-icon\">(.*?)<\/span>/g)];
  if (activityMatches.length > 0) {
    const actIcons = ['⚽', '🎨', '🔬', '💻', '🎭', '🗣️', '📚', '🌱'];
    for (let i = 0; i < activityMatches.length; i++) {
      let icon = activityMatches[i][1];
      if (icon.includes('ð') || icon.includes('â')) {
        c = c.split(icon).join(actIcons[i % actIcons.length]);
      }
    }
  }

  fs.writeFileSync(f, c, 'utf8');
  console.log('Fixed', f);
});
