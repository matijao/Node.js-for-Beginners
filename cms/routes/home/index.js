const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const Category = require("../../models/Category");

router.all("/*", (req, res, next) => {   // all after "/admin"

    req.app.locals.layout = "home";  // overwrite, če pride kdo do "/admin/*"
    next();


}); 

router.get("/", (req, res) => {

    Post.find({}).then(posts =>{

        Category.find({}).then(categories =>{

            res.render("home/index", {posts: posts, categories: categories});

            //console.log(posts);

        });
    });

    //res.render("home/index"); // vedno gleda v VIEWS folder

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

router.get("/post/:id", (req, res) => {

    Post.findOne({_id: req.params.id}).then(post => {
        Category.find({}).then(categories => {

            res.render("home/post", {post: post, categories: categories})

        });
    });
});

module.exports = router; // izvozimo skupaj s funkcijami