var fs = require('fs');

function generateWord(){
    let word = '';
    let str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for(let i=0; i<10; i++)
        word+= str[Math.floor(Math.random() * 36)];
    return word;
}

let string = '';
for(let i=0; i<100; i++)
    string+= generateWord()+"\n";

fs.writeFile("./lib/readme.txt",string, (err) => {});
fs.readFile("./lib/readme.txt",'utf8',function(err,data){ console.log(data); }) 