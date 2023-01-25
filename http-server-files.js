const http = require("http");
const fs = require("fs");

http.createServer((req, res) => {

    console.log(req.method);

    if(req.url === "/") {
        fs.readFile("global.html", "utf-8", (err, data) => {

            res.writeHead(200, {"Content-type" : "text/html"});
            res.end(data);
        })
    } else {

        res.writeHead(404, {"content-type" : "text/plain"});
        res.end("404 Could not find your data");
    }

}).listen(3333);

console.log("listening...");