let obj = [
    {"name" : "Anand", "age":22, "gender":0, "city" : "Mumbai"}, 
    {"name" : "Bihu", "age":17, "gender":1, "city" : "Pune"}
    ];

function jsonFile(fileName){
    var fs = require('fs');
        data = '';
        for(let i of obj){
            data += i.name + ' | ' + i.age + ' | ' + i.gender + ' | ' + i.city +'\n';
        }
    fs.writeFile(fileName,data, (err) => {});
}

jsonFile('./lib/users-info.txt');
