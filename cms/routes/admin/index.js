const express = require("express");
const router = express.Router();

router.all("/*", (req, res, next) => {   // all after "/admin"

    req.app.locals.layout = "admin";  // overwrite, če pride kdo do "/admin/*"
    next();


}); 


router.get("/", (req, res) => {  // "/admin" je že od prej, zato tukaj ni potreben

    // res.send("It works"); 
    res.render("admin/index"); // vedno gleda v VIEWS folder

});

router.get("/dashboard", (req, res) => {  // "/admin" je že od prej, zato tukaj ni potreben

    // res.send("It works"); 
    res.render("admin/dashboard"); // vedno gleda v VIEWS folder

});



module.exports = router;