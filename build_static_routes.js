const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const pages = [
  { dir: 'dashboard', src: 'dashboard.html' },
  { dir: 'transfer', src: 'transfer.html' },
  { dir: 'activity', src: 'activity.html' },
  { dir: 'cards', src: 'cards.html' },
  { dir: 'admin-login', src: 'admin-login.html' },
  { dir: 'admin', src: 'admin.html' },
  { dir: 'register', src: 'register.html' },
  { dir: 'sign-in', src: 'sign-in.html' }
];

pages.forEach(p => {
  const targetDir = path.join(baseDir, p.dir);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  let html = fs.readFileSync(path.join(baseDir, p.src), 'utf8');
  // Update relative asset links for subdirectory index.html files
  html = html.replace(/href="css\//g, 'href="/css/');
  html = html.replace(/src="js\//g, 'src="/js/');
  fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf8');
  console.log(`Generated static directory: /${p.dir}/index.html`);
});

console.log('All static directories successfully generated!');
