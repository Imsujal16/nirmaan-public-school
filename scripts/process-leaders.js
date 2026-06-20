const heicConvert = require('heic-convert');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const DIR = path.join(__dirname, '..', 'public', 'images for about us section');

const leaders = [
  {
    input: 'Founder.HEIC', output: 'founder-portrait.jpg',
    leftFrac: 0.16, rightFrac: 0.16, topFrac: 0.10, heightFrac: 0.50,
  },
  {
    input: 'Director.HEIC', output: 'director-portrait.jpg',
    leftFrac: 0.28, rightFrac: 0.06, topFrac: 0.09, heightFrac: 0.50,
  },
  {
    input: 'Manager.HEIC', output: 'manager-portrait.jpg',
    leftFrac: 0.14, rightFrac: 0.14, topFrac: 0.16, heightFrac: 0.48,
  },
  {
    input: 'Principal.HEIC', output: 'principal-portrait.jpg',
    leftFrac: 0.13, rightFrac: 0.13, topFrac: 0.07, heightFrac: 0.52,
  },
];

async function processImage(cfg) {
  const inputPath  = path.join(DIR, cfg.input);
  const outputPath = path.join(DIR, cfg.output);
  console.log('\n Processing: ' + cfg.input);

  const heicBuffer = fs.readFileSync(inputPath);
  const jpegBuffer = await heicConvert({ buffer: heicBuffer, format: 'JPEG', quality: 1 });

  const meta = await sharp(jpegBuffer).metadata();
  const W = meta.width;
  const H = meta.height;
  console.log('   Source: ' + W + 'x' + H);

  const left   = Math.round(W * cfg.leftFrac);
  const top    = Math.round(H * cfg.topFrac);
  const width  = Math.round(W * (1 - cfg.leftFrac - cfg.rightFrac));
  const height = Math.round(H * cfg.heightFrac);
  console.log('   Crop: left=' + left + ' top=' + top + ' w=' + width + ' h=' + height);

  await sharp(jpegBuffer)
    .extract({ left, top, width, height })
    .resize(400, 400, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(outputPath);

  console.log('   Saved -> ' + cfg.output + '  OK');
}

(async () => {
  console.log('=== Leader Portrait Processor v2 ===');
  for (const cfg of leaders) {
    try { await processImage(cfg); }
    catch (e) { console.error('   ERROR: ' + cfg.input + ' - ' + e.message); }
  }
  console.log('\n All done!\n');
})();
