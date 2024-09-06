const fs = require('fs');
const http = require('http');
const port = 8080;

const homePage = (res) => {
    fs.readFile('./lib/home.html', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
};

const aboutPage = (res) => {
    fs.readFile('./lib/about.html', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
};

const contactPage = (res) => {
    fs.readFile('./lib/contact.html', (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
};

const server = http.createServer((req, res) => {
    const url = req.url;
    console.log(url)
    switch (url) {
        case '/home':
            homePage(res);
            break;
        case '/about':
            aboutPage(res);
            break;
        case '/contact':
            contactPage(res);
            break;
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
