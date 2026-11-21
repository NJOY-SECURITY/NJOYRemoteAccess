import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const source = path.resolve(process.argv[2] || '/src/www');
const brand = path.dirname(fileURLToPath(import.meta.url));

function replace(relative, before, after) {
  const file = path.join(source, relative);
  const content = fs.readFileSync(file, 'utf8');
  if (!content.includes(before)) throw new Error(`Branding anchor missing: ${relative}`);
  fs.writeFileSync(file, content.replace(before, after));
}

function replacePattern(relative, pattern, replacement) {
  const file = path.join(source, relative);
  const content = fs.readFileSync(file, 'utf8');
  if (!pattern.test(content)) throw new Error(`Branding anchor missing: ${relative}`);
  fs.writeFileSync(file, content.replace(pattern, replacement));
}

for (const [page, title] of [
  ['index.html', 'NJOY SECURITY | Remote Access'],
  ['screen.html', 'NJOY SECURITY | Additional Display'],
]) {
  replacePattern(page, /<title>[^<]+<\/title>/, `<title>${title}</title>`);
  replacePattern(page, /    <!-- Icons \(see app\/images\/icons\/Makefile[\s\S]*?    <link rel="stylesheet" href="app\/styles\/base.css">/,
    `    <meta name="theme-color" content="#050d10">\n` +
    `    <link rel="icon" type="image/png" sizes="48x48" href="app/images/icons/njoy-icon-48.png">\n` +
    `    <link rel="apple-touch-icon" sizes="180x180" href="app/images/icons/njoy-icon-180.png">\n` +
    `    <link rel="stylesheet" href="app/styles/base.css">\n` +
    `    <link rel="stylesheet" href="app/styles/njoy.css">`);
}

replace('index.html', 'KasmVNC encountered an error:', 'NJOY SECURITY Remote Access encountered an error:');
replace('screen.html', 'KasmVNC encountered an error:', 'NJOY SECURITY Remote Access encountered an error:');
replace('index.html', 'href="https://www.kasmweb.com/kasmvnc"', 'href="https://www.njoysecurity.com.au/"');
replace('index.html', 'title="KasmVNC Learn More"', 'title="NJOY SECURITY"');
replace('index.html', 'alt="KasmVNC Learn More"', 'alt="NJOY SECURITY"');
replace('app/ui.js', 'const PAGE_TITLE = "KasmVNC";', 'const PAGE_TITLE = "NJOY SECURITY | Remote Access";');
replace('app/control-panel-assets.js', "import kasmLogo from './images/icons/kasm_logo.svg';",
  "import kasmLogo from './images/icons/njoy-logo-teal.svg';");

for (const [name, destination] of [
  ['njoy-logo-teal.svg', 'app/images/icons/njoy-logo-teal.svg'],
  ['njoy-icon-48.png', 'app/images/icons/njoy-icon-48.png'],
  ['njoy-icon-180.png', 'app/images/icons/njoy-icon-180.png'],
  ['njoy-logo-teal.svg', 'public/njoy-logo-teal.svg'],
  ['teal-hero-wave.png', 'app/images/teal-hero-wave.png'],
  ['njoy.css', 'app/styles/njoy.css'],
]) {
  fs.copyFileSync(path.join(brand, 'assets', name), path.join(source, destination));
}

replace('public/disconnected.html', '<title>Session Disconnected</title>',
  '<title>Session Disconnected | NJOY SECURITY</title>');
replace('public/disconnected.html', '--bg-color: #f8f9fa;', '--bg-color: #050d10;');
replace('public/disconnected.html', '--card-bg: #ffffff;', '--card-bg: #0c171c;');
replace('public/disconnected.html', '--accent-color: #d9534f;', '--accent-color: #00ded0;');
replace('public/disconnected.html', '--accent-dark: #c9302c;', '--accent-dark: #00bdb1;');
replace('public/disconnected.html', '--text-color: #333;', '--text-color: #f5f7f7;');
replace('public/disconnected.html', "--font-family: 'Segoe UI', Tahoma, sans-serif;",
  "--font-family: 'DM Sans', Arial, sans-serif;");
replace('public/disconnected.html', 'color: #555;', 'color: #b5c2c7;');
replace('public/disconnected.html', 'color: white;', 'color: #050d10;');
replace('public/disconnected.html', '<div class="icon">⚠️</div>',
  '<img src="/njoy-logo-teal.svg" alt="NJOY SECURITY" style="width:180px;max-width:100%;margin-bottom:1rem">');

console.log('Applied NJOY SECURITY web branding');
