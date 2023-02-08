const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

// const User = require("./models/user");
const bcrypt = require("bcryptjs");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
// enginr nam omogoča, da html fajle razbijemo na več manjših (footer, nav-bar,...)
// znotraj glavnega. Pomožni fajli morajo biti v specificirani mapi "PARTIALS(!)/home"

// Set View Engine

app.engine("handlebars", exphbs({defaultLayout: "home"}));
app.set("view engine", "handlebars");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/cms", {useMongoClient: true}).then(db => {
    console.log("MONGO connected");
}).catch(err => console.log(err));


// Load routes

const home = require("./routes/home/index");
const admin = require("./routes/admin/index");
const posts = require("./routes/admin/posts");

// Use Routes

app.use("/", home);
app.use("/admin", admin);
app.use("/admin/posts", posts);



app.listen(4500, () => {
    console.log(`listening on port 4500`);
});