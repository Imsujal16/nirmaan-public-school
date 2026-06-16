const fs = require('fs');
const files = ['index.html', 'about.html', 'academics.html', 'admissions.html', 'contact.html'];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');

  // Replace Facebook
  c = c.replace(/https:\/\/www\.facebook\.com\/search\/top\?q=nirmanpublic%20School%20Aliganj/g, 'https://www.facebook.com/nirmaan.public.school.aliganj/');
  
  // Replace Instagram
  c = c.replace(/https:\/\/www\.instagram\.com\/nirmanpublic\//g, 'https://www.instagram.com/nirmaan_public_school/');
  
  // Replace YouTube
  c = c.replace(/https:\/\/www\.youtube\.com\/results\?search_query=nirmanpublic\+School\+Aliganj/g, 'https://www.youtube.com/@nirmanpublicschoolaliganj4860/videos');

  // Some files might still have the old '#' if my previous regex didn't match. 
  // Let's do a fallback replace for the raw # if they exist.
  // Footer socials fallback:
  c = c.replace(/<a href=\"#\" class=\"social-btn\" aria-label=\"Facebook\"><i class=\"fab fa-facebook-f\"><\/i><\/a>/g, 
                '<a href="https://www.facebook.com/nirmaan.public.school.aliganj/" class="social-btn" aria-label="Facebook" target="_blank"><i class="fab fa-facebook-f"></i></a>');
  c = c.replace(/<a href=\"#\" class=\"social-btn\" aria-label=\"Instagram\"><i class=\"fab fa-instagram\"><\/i><\/a>/g, 
                '<a href="https://www.instagram.com/nirmaan_public_school/" class="social-btn" aria-label="Instagram" target="_blank"><i class="fab fa-instagram"></i></a>');
  c = c.replace(/<a href=\"#\" class=\"social-btn\" aria-label=\"YouTube\"><i class=\"fab fa-youtube\"><\/i><\/a>/g, 
                '<a href="https://www.youtube.com/@nirmanpublicschoolaliganj4860/videos" class="social-btn" aria-label="YouTube" target="_blank"><i class="fab fa-youtube"></i></a>');
  c = c.replace(/<a href=\"#\" class=\"social-btn\" aria-label=\"WhatsApp\"><i class=\"fab fa-whatsapp\"><\/i><\/a>/g, 
                '<a href="https://wa.me/919918225511" class="social-btn" aria-label="WhatsApp" target="_blank"><i class="fab fa-whatsapp"></i></a>');

  // Contact.html specific fallback:
  if (f === 'contact.html') {
    c = c.replace(/<a href=\"#\" class=\"contact-social-link\"><i class=\"fab fa-facebook-f\"><\/i><\/a>/g, 
                  '<a href="https://www.facebook.com/nirmaan.public.school.aliganj/" class="contact-social-link" target="_blank"><i class="fab fa-facebook-f"></i></a>');
    c = c.replace(/<a href=\"#\" class=\"contact-social-link\"><i class=\"fab fa-instagram\"><\/i><\/a>/g, 
                  '<a href="https://www.instagram.com/nirmaan_public_school/" class="contact-social-link" target="_blank"><i class="fab fa-instagram"></i></a>');
    c = c.replace(/<a href=\"#\" class=\"contact-social-link\"><i class=\"fab fa-youtube\"><\/i><\/a>/g, 
                  '<a href="https://www.youtube.com/@nirmanpublicschoolaliganj4860/videos" class="contact-social-link" target="_blank"><i class="fab fa-youtube"></i></a>');
    c = c.replace(/<a href=\"#\" class=\"contact-social-link\"><i class=\"fab fa-whatsapp\"><\/i><\/a>/g, 
                  '<a href="https://wa.me/919918225511" class="contact-social-link" target="_blank"><i class="fab fa-whatsapp"></i></a>');
  }

  fs.writeFileSync(f, c, 'utf8');
  console.log('Updated', f);
});
