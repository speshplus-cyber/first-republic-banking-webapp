const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.jfif': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') {
    reqUrl = '/index.html';
  }

  // Handle clean URLs and direct file requests
  let cleanUrl = reqUrl.replace(/\\/g, '/');
  let filePath = path.join(PUBLIC_DIR, cleanUrl);

  let targetPath = filePath;
  if (!fs.existsSync(targetPath) || fs.statSync(targetPath).isDirectory()) {
    if (fs.existsSync(filePath + '.html')) {
      targetPath = filePath + '.html';
    } else if (fs.existsSync(path.join(filePath, 'index.html'))) {
      targetPath = path.join(filePath, 'index.html');
    }
  }

  // Also check relative to process.cwd() if PUBLIC_DIR differs
  if (!fs.existsSync(targetPath)) {
    let cwdPath = path.join(process.cwd(), cleanUrl);
    if (fs.existsSync(cwdPath) && !fs.statSync(cwdPath).isDirectory()) {
      targetPath = cwdPath;
    } else if (fs.existsSync(cwdPath + '.html')) {
      targetPath = cwdPath + '.html';
    } else if (fs.existsSync(path.join(cwdPath, 'index.html'))) {
      targetPath = path.join(cwdPath, 'index.html');
    }
  }

  fs.stat(targetPath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`
        <!DOCTYPE html>
        <html>
          <head><title>404 Not Found - First Republic</title></head>
          <body style="font-family:sans-serif; text-align:center; padding:50px;">
            <h2>Page Not Found</h2>
            <p>The requested URL was not found on this server.</p>
            <p style="font-size:10px; color:#999;">Tried: ${targetPath} | CWD: ${process.cwd()} | __dirname: ${__dirname}</p>
            <a href="/index.html">Return to Private Wealth Portal</a>
          </body>
        </html>
      `);
      return;
    }

    serveFile(targetPath, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      return res.end('500 Internal Server Error');
    }
    res.writeHead(200, {
      'Content-Type': contentType,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(data);
  });
}

server.listen(PORT, () => {
  console.log(`First Republic Private Wealth Webapp running at http://localhost:${PORT}/`);
});
