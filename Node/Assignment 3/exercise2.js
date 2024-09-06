const fs = require('fs');
const http = require('http');
const port = 8080;

let dataArr = [];

fs.readFile('./lib/users.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    let arr = data.split('\n');
    arr.length = arr.length - 1; 

    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split(' | ');
    }

    for (let i of arr) {
        dataArr.push({ name: i[0], age: i[1], gender: i[2], city: i[3] });
    }
});

const generateHTML = () => {
    let tablerow = '';
    dataArr.forEach(obj => {
        tablerow += `<tr>
                        <td>${obj.name}</td>
                        <td>${obj.age}</td>
                        <td>${obj.gender}</td>
                        <td>${obj.city}</td>
                    </tr>`;
    });

    return `<html lang="en">
                <body> 
                    <table border="1">
                        ${tablerow}
                    </table>
                </body>
            </html>`;
};

const server = http.createServer((req, res) => {
    const htmlCode = generateHTML();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlCode);
});

server.listen(port, () => { console.log(`http://localhost:${port}/`) });
