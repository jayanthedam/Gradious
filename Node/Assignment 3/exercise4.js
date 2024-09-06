const fs = require('fs');
const http = require('http');
const path = require('path');
const port = 8080;

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url);
    fs.readFile(filePath, (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
    });
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
