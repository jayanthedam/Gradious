function jsonFile(fileName){
    var fs = require('fs');
    fs.readFile(fileName,'utf8',function(err,data){

        let arr = data.split('\n')
        arr.length = arr.length-1;

        for (let i = 0; i < arr.length; i++) {
            arr[i] = arr[i].split(' | ')
        }
        let obj =[]
        for(let i of arr){
                obj.push({name : i[0], age : i[1], gender : i[2], city : i[3] });
            }
        console.log(obj)
    })
}

jsonFile('./lib/Json.txt');
