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
const upload = require("express-fileupload");
const session = require("express-session");
const flash = require("connect-flash");
const {mongoDbUrl} = require("./config/database");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


mongoose.Promise = global.Promise;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
// enginr nam omogoča, da html fajle razbijemo na več manjših (footer, nav-bar,...)
// znotraj glavnega. Pomožni fajli morajo biti v specificirani mapi "PARTIALS(!)/home"



// Set View Engine

const {select, generateDate} = require("./helpers/handlebars-helpers"); // tukaj vzamemo le eno funkcijo
//app.engine("handlebars", exphbs(config:{handlebars:allowInsecurePrototypeAccess(Handlebars),defaultLayout: "home"}));

app.engine("handlebars", exphbs({handlebars:allowInsecurePrototypeAccess(Handlebars),defaultLayout: "home", helpers: {select: select, generateDate: generateDate}}));
app.set("view engine", "handlebars");

//  Upload Midleware
app.use(upload());

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Method Override
app.use(methodOverride("_method"));

mongoose.connect(mongoDbUrl, {useMongoClient: true}).then(db => {
    console.log("MONGO connected");
}).catch(err => console.log(err));

// Sessions
app.use(session({
    secret: "MatijaOblak",
    resave: true,
    saveUninitialized: true,
}));

// Flash

app.use(flash());

// Passport

app.use(passport.initialize());
app.use(passport.session());

// Local Variables using Middleware

app.use((req, res, next) =>{
    res.locals.user = req.user || null;;
    res.locals.success_message = req.flash("success_message");
    res.locals.error_message = req.flash("error_message");
    res.locals.form_message = req.flash("form_error");
    res.locals.error = req.flash("error");

    next();
})

// Load routes

const home = require("./routes/home/index");
const admin = require("./routes/admin/index");
const posts = require("./routes/admin/posts");
const categories = require("./routes/admin/categories");
const comments = require("./routes/admin/comments");

// Use Routes

app.use("/", home);
app.use("/admin", admin);
app.use("/admin/posts", posts);
app.use("/admin/categories", categories);
app.use("/admin/comments", comments);



app.listen(4500, () => {
    console.log(`Listening on port 4500`);
});