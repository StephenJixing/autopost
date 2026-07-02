const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const { startServer } = require('../server');

test('GET / returns HTML and POST /proxy forwards payload', async () => {
  const targetServer = http.createServer((req, res) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ received: body, header: req.headers['x-test'] || '' }));
    });
  });

  await new Promise((resolve) => targetServer.listen(0, '127.0.0.1', resolve));
  const targetPort = targetServer.address().port;

  const appServer = await startServer(0, '127.0.0.1');
  const appPort = appServer.address().port;

  try {
    const htmlResponse = await fetch(`http://127.0.0.1:${appPort}/`);
    assert.equal(htmlResponse.status, 200);
    const html = await htmlResponse.text();
    assert.match(html, /AutoPOST/);

    const proxyResponse = await fetch(`http://127.0.0.1:${appPort}/proxy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: `http://127.0.0.1:${targetPort}/echo`,
        headers: { 'X-Test': 'ok' },
        body: JSON.stringify({ hello: 'world' })
      })
    });

    const payload = await proxyResponse.json();
    assert.equal(payload.status, 200);
    assert.match(payload.body, /hello/);
  } finally {
    await new Promise((resolve) => appServer.close(resolve));
    await new Promise((resolve) => targetServer.close(resolve));
  }
});
