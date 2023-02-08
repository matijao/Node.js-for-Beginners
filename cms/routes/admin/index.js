const express = require("express");
const router = express.Router();
const User = require("../../models/Post");
const faker = require("faker");


router.all("/*", (req, res, next) => {   // all after "/admin"

    req.app.locals.layout = "admin";  // overwrite, če pride kdo do "/admin/*"
    next();


}); 


router.get("/", (req, res) => {  // "/admin" je že od prej, zato tukaj ni potreben

    // res.send("It works"); 
    res.render("admin/index"); // vedno gleda v VIEWS folder

});

router.post("/generate-fake-posts", (req, res) => {

    for (let i = 0; i < req.body.amount; i++) {

        let post = new User();

        post.title = faker.name.title();
        post.status = "public";
        post.allowComments = faker.random.boolean();
        post.body = faker.lorem.sentence();

        post.save(function(err){
            if(err) throw err;
        });
    } 
    res.redirect("/admin/posts");
})

module.exports = router;