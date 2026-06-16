const fs = require('fs');
const files = ['index.html', 'about.html', 'academics.html', 'admissions.html', 'contact.html'];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');

  // Regex replacement for footer socials to ignore whitespace differences
  c = c.replace(/<a href="[^"]*" class="social-btn" aria-label="Facebook"><i class="fab fa-facebook-f"><\/i><\/a>/, 
                '<a href="https://www.facebook.com/search/top?q=nirmanpublic%20School%20Aliganj" class="social-btn" aria-label="Facebook" target="_blank"><i class="fab fa-facebook-f"></i></a>');
                
  c = c.replace(/<a href="[^"]*" class="social-btn" aria-label="Instagram"><i class="fab fa-instagram"><\/i><\/a>/, 
                '<a href="https://www.instagram.com/nirmanpublic/" class="social-btn" aria-label="Instagram" target="_blank"><i class="fab fa-instagram"></i></a>');
                
  c = c.replace(/<a href="[^"]*" class="social-btn" aria-label="YouTube"><i class="fab fa-youtube"><\/i><\/a>/, 
                '<a href="https://www.youtube.com/results?search_query=nirmanpublic+School+Aliganj" class="social-btn" aria-label="YouTube" target="_blank"><i class="fab fa-youtube"></i></a>');
                
  c = c.replace(/<a href="[^"]*" class="social-btn" aria-label="WhatsApp"><i class="fab fa-whatsapp"><\/i><\/a>/, 
                '<a href="https://wa.me/919918225511" class="social-btn" aria-label="WhatsApp" target="_blank"><i class="fab fa-whatsapp"></i></a>');

  // Contact.html specific icons
  if (f === 'contact.html') {
    c = c.replace(/<a href="[^"]*" class="contact-social-link"><i class="fab fa-facebook-f"><\/i><\/a>/, 
                  '<a href="https://www.facebook.com/search/top?q=nirmanpublic%20School%20Aliganj" class="contact-social-link" target="_blank"><i class="fab fa-facebook-f"></i></a>');
    c = c.replace(/<a href="[^"]*" class="contact-social-link"><i class="fab fa-instagram"><\/i><\/a>/, 
                  '<a href="https://www.instagram.com/nirmanpublic/" class="contact-social-link" target="_blank"><i class="fab fa-instagram"></i></a>');
    c = c.replace(/<a href="[^"]*" class="contact-social-link"><i class="fab fa-youtube"><\/i><\/a>/, 
                  '<a href="https://www.youtube.com/results?search_query=nirmanpublic+School+Aliganj" class="contact-social-link" target="_blank"><i class="fab fa-youtube"></i></a>');
    c = c.replace(/<a href="[^"]*" class="contact-social-link"><i class="fab fa-whatsapp"><\/i><\/a>/, 
                  '<a href="https://wa.me/919918225511" class="contact-social-link" target="_blank"><i class="fab fa-whatsapp"></i></a>');
  }

  fs.writeFileSync(f, c, 'utf8');
  console.log('Updated', f);
});
