var fs = require('fs');

function copyFile(fileName, newFile){
    fs.readFile(fileName,'utf8',function(err,data){
        fs.writeFile(newFile,data, (err) => {});
    })
}

copyFile('./lib/readme.txt','./lib/newFile.txt')