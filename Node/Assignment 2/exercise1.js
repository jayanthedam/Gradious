var fs = require('fs');
const http = require('http');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((req, res) => {
  console.log("Request received");

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Accept');

  const stream = fs.createReadStream('./lib/BigText.txt', { encoding: 'utf8' });

  stream.on('error', (err) => {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('File not found or some error occurred');
    console.error(err);
  });

  stream.on('open', () => {
    res.writeHead(200);
    stream.pipe(res);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
