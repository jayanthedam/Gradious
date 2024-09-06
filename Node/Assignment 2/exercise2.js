const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, './lib/1mb.exe'); 
const destFile = path.join(__dirname, './lib/gradious-assignment.exe');

const reader = fs.createReadStream(sourceFile);
const writer = fs.createWriteStream(destFile);

reader.on('data', (chunk) => { writer.write(chunk) });
reader.on('end', () => { writer.end() });

writer.on('finish', () => { console.log('gradious-assignment.exe file created') });
