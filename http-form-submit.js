const http = require("http");
const fs = require("fs");

http.createServer((req,res) => {
    let body = "";
    if(req.method === "GET"){

        res.writeHead(200, {"content-type":"text/html"});

        fs.readFile("./http-form.html","utf-8", (err, data) => { //preverimo fajl in ga posredujemo v browser kot odgovor

            if(err) throw err;
            res.write(data);
            res.end();
        });


        console.log(req.method);
    } else if (req.method=="POST") {
        req.on("data", (data) => {
            body += data;
        });

        req.on("end", () => {
            res.writeHead(200, {"content-type":"text/html"});
            res.write(body, () => {
                res.end();
            });
        });
    } else {
        res.writeHead(404, {"content-type":"text/plain"});
        res.end("404 ERROR, could not find that page")
    }
}).listen(4444);

console.log("It's working");