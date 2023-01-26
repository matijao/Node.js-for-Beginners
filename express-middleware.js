const express = require("express");

const port = process.env.port || 9999;

let app = express();

app.use("/css", express.static(__dirname + "/public"));



//app.use("/", (req, res, next) => { // middlewave executes before anythingelse. Npr pregledamo kukije
app.use((req, res, next) => {

    console.log("Middleware");
    next(); // to continue program


});


app.get("/", (req, res) => {

    res.send(`
    
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/style.css"
    <title>Document</title>
</head>
<body>

    <h1>Hello</h1>

<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
    Aspernatur ab nam amet delectus eius natus.
    Dolor, aliquam molestias nemo quod culpa cupiditate officiis excepturi!
    Molestias optio voluptatum voluptas rerum accusantium?</p>

</body>

</html>
    
    `);

});

app.listen(port);

console.log(("It's working"));