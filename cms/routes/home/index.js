const express = require("express");
const router = express.Router();

router.all("/*", (req, res, next) => {   // all after "/admin"

    req.app.locals.layout = "home";  // overwrite, če pride kdo do "/admin/*"
    next();


}); 

router.get("/", (req, res) => {

    // res.send("It works"); 
    res.render("home/index"); // vedno gleda v VIEWS folder

});

router.get("/about", (req, res) => {

    res.render("home/about");

});

router.get("/about", (req, res) => {

    res.render("home/about");

});

router.get("/login", (req, res) => {

    res.render("home/login");

});

router.get("/register", (req, res) => {

    res.render("home/register");

});

module.exports = router; // izvozimo skupaj s funkcijami