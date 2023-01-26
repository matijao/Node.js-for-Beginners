const express = require("express");

const port = process.env.port || 9999;

let app = express();

app.get("/", function(req, res)  {

    res.send("Home");

});

app.get("/post/:id/category/:category_id", (req, res) => {

    res.send(`
    
    <p>Here is ${req.params.id} </p>
    <p>Here is ${req.params.category_id} </p>

    `);
});



app.listen(port);

console.log(("It's working"));