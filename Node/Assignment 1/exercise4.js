function logFile(fileName){
    var fs = require('fs');
    fs.readFile(fileName,'utf8',function(err,data){

        let arr = data.split('\n')
        arr.length = arr.length-1;

        let now = new Date();
        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        
        const timestamp = `${day}-${month}-${year} ${hours}:${minutes}:${seconds} `;

        for (let i = 0; i < arr.length; i++) {
            arr[i] = timestamp +' '+arr[i];   
        }
        data = arr.join('\n')
        fs.writeFile(fileName,data, (err) => {});
    })
}

logFile('./lib/debug.log');
