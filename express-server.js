const express = require("express");

const port = process.env.port || 9999;

let app = express();

app.get("/", (req, res) => {

    res.send("<h1>Hello!<\h1>");

});

app.get("/api", (req, res) => {

    //res.send("<h1>API page<\h1>");

    res.json({name: "Matija"});

});

app.listen(port);

console.log(("It's working"));