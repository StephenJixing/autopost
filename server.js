const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT || 3000);
const INDEX_FILE = path.join(__dirname, 'autopost.html');

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function readIndex() {
  return fs.readFileSync(INDEX_FILE, 'utf8');
}

function forwardRequest(targetUrl, headers, body) {
  return new Promise((resolve, reject) => {
    const target = new URL(targetUrl);
    const transport = target.protocol === 'https:' ? https : http;
    const requestHeaders = { ...headers };
    if (requestHeaders.host) {
      delete requestHeaders.host;
    }
    requestHeaders.host = target.host;
    if (body !== undefined && body !== null) {
      requestHeaders['Content-Length'] = Buffer.byteLength(body, 'utf8');
    } else {
      delete requestHeaders['Content-Length'];
    }

    const req = transport.request({
      hostname: target.hostname,
      port: target.port || (target.protocol === 'https:' ? 443 : 80),
      path: `${target.pathname}${target.search}`,
      method: 'POST',
      headers: requestHeaders
    }, (res) => {
      let responseBody = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        responseBody += chunk;
      });
      res.on('end', () => {
        resolve({
          status: res.statusCode || 500,
          headers: res.headers,
          body: responseBody
        });
      });
    });

    req.on('error', reject);
    if (body !== undefined && body !== null) {
      req.write(body);
    }
    req.end();
  });
}

function createHandler() {
  return function handleRequest(req, res) {
    const url = new URL(req.url, `http://${req.headers.host || '127.0.0.1'}`);

    if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/autopost.html')) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(readIndex());
      return;
    }

    if (req.method === 'GET' && url.pathname === '/health') {
      sendJson(res, 200, { ok: true });
      return;
    }

    if (req.method === 'POST' && url.pathname === '/proxy') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk;
      });
      req.on('end', async () => {
        try {
          const payload = JSON.parse(body || '{}');
          const result = await forwardRequest(payload.url, payload.headers || {}, payload.body || '');
          sendJson(res, 200, result);
        } catch (error) {
          sendJson(res, 500, { error: error.message });
        }
      });
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Not Found');
  };
}

function createServer() {
  const handler = createHandler();
  return http.createServer((req, res) => handler(req, res));
}

function startServer(port = PORT, host = HOST) {
  const server = createServer();
  return new Promise((resolve) => {
    server.listen(port, host, () => resolve(server));
  });
}

if (require.main === module) {
  startServer().then((server) => {
    const address = server.address();
    console.log(`AutoPOST server running at http://${HOST}:${address.port}/`);
  });
}

module.exports = createHandler();
module.exports.createServer = createServer;
module.exports.startServer = startServer;
