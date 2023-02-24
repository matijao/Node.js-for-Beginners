const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const User = require("../../models/User");
const Comment = require("../../models/Comment");
const Category = require("../../models/Category");
const faker = require("faker");
const { userAuthenticated } = require("../../helpers/authentication");


router.all("/*", userAuthenticated, (req, res, next) => {   // all after "/admin"

    req.app.locals.layout = "admin";  // overwrite, če pride kdo do "/admin/*"
    next();


}); 


router.get("/", (req, res) => {  // "/admin" je že od prej, zato tukaj ni potreben

    Post.count().then(postCount => {
        Comment.count().then(commentCount => {
            User.count().then(userCount => {
                Category.count().then(categoryCount => {


                    // res.send("It works"); 
                    res.render("admin/index", {postCount: postCount, commentCount: commentCount, userCount: userCount,categoryCount: categoryCount}); // vedno gleda v VIEWS folder
                    console.log([{postCount: postCount}, {commentCount: commentCount},{userCount: userCount},{categoryCount: categoryCount}]);
                });
            });
        });
    });
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