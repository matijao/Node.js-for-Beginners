const http = require("http");

const server = http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    
    res.end("<h1> Hello, it's Matija </h1>");

});

server.listen(9111);

console.log("Server is running");
