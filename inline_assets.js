const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
const js = fs.readFileSync(path.join(baseDir, 'js', 'state.js'), 'utf8');
const comp = fs.readFileSync(path.join(baseDir, 'js', 'components.js'), 'utf8');
const css = fs.readFileSync(path.join(baseDir, 'css', 'custom.css'), 'utf8');

const pages = [
  'index.html',
  'sign-in.html',
  'register.html',
  'dashboard.html',
  'transfer.html',
  'activity.html',
  'cards.html',
  'admin-login.html',
  'admin.html'
];

pages.forEach(p => {
  const filePath = path.join(baseDir, p);
  let html = fs.readFileSync(filePath, 'utf8');

  // Replace custom.css with inline style
  html = html.replace(/<link\s+rel=["']stylesheet["']\s+href=["']\/?css\/custom\.css["']\s*\/?>/gi, '<style>' + css + '</style>');

  // Replace script tags with inlined JavaScript
  html = html.replace(/<script\s+src=["']\/?js\/state\.js["']\s*><\/script>\s*<script\s+src=["']\/?js\/components\.js["']\s*><\/script>/gi, 
    '<script>\n' + js + '\n</script>\n<script>\n' + comp + '\n</script>'
  );

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`Successfully bundled assets into ${p}`);
});

console.log('All pages are now 100% self-contained!');
