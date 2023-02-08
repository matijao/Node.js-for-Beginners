const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
// const User = require("./models/user");
const bcrypt = require("bcryptjs");
const path = require("path");
const exphbs = require("express-handlebars");
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access");
const Handlebars = require("handlebars");
const methodOverride = require("method-override");


const app = express();

app.use(express.static(path.join(__dirname, "public")));
// enginr nam omogoča, da html fajle razbijemo na več manjših (footer, nav-bar,...)
// znotraj glavnega. Pomožni fajli morajo biti v specificirani mapi "PARTIALS(!)/home"

// Set View Engine

const {select} = require("./helpers/handlebars-helpers"); // tukaj vzamemo le eno funkcijo
//app.engine("handlebars", exphbs(config:{handlebars:allowInsecurePrototypeAccess(Handlebars),defaultLayout: "home"}));

app.engine("handlebars", exphbs({handlebars:allowInsecurePrototypeAccess(Handlebars),defaultLayout: "home", helpers: {select: select}}));
app.set("view engine", "handlebars");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Method Override
app.use(methodOverride("_method"));

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
    console.log(`Listening on port 4500`);
});