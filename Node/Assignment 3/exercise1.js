const fs = require('fs')
const http = require('http')
const port = 8080


const server = http.createServer((req,res)=>{
    
    fs.readFile('./lib/index.html',(err,data)=> {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(data);
    })


});

server.listen(port,() => { console.log(`localhost:${port}`)});