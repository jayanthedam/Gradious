function getFileContent(fileName){
    var fs = require('fs');
    fs.readFile(fileName,'utf8',function(err,data){
        console.log(data);
        console.log('\n-----File Run successfully---------\n');
    })
}

getFileContent('./lib/readme.txt')
getFileContent('./lib/index.html')
getFileContent('./lib/students.csv')