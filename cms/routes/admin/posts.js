const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");

router.all("/*", (req, res, next) => {   // all after "/admin"

    req.app.locals.layout = "admin";  // overwrite, če pride kdo do "/admin/*"
    next();


}); 

router.get("/", (req, res) => {

    Post.find({}).then(posts => {

    res.render("admin/posts", {posts: posts});
    });
});

router.get("/create", (req, res) => {
    res.render("admin/posts/create");

})

router.post("/create*", (req, res) => {

    let allowComments = true;

    if (req.body.allowComments){
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newPost = new Post({
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body

    });

newPost.save().then(savedPost => {
    console.log(savedPost);
    res.redirect("/admin/posts");
}).catch(err => {
    console.log("Could not save data");
});


    console.log(req.body);
});


router.get("/edit/:id", (req, res) => {

    Post.findOne({_id: req.params.id}).then(post => {

        res.render("admin/posts/edit", {post: post});
        });


    // res.send(req.params.id);
    // res.render("admin/posts/edit");
});


router.put("/edit/:id", (req, res) => {

    //res.send("It workss");

    Post.findOne({_id: req.params.id}).then(post => {

        if (req.body.allowComments){
            allowComments = true;
        } else {
            allowComments = false;
        }

        post.title = req.body.title;
        post.status = req.body.status;
        post.allowComments = allowComments;
        post.body = req.body.body;

        post.save().then(updatedPost=> {
            res.redirect("/admin/posts");
        })
        //res.render("admin/posts/edit", {post: post});
        });
})

router.delete("/:id", (req, res) => {
    Post.remove({_id: req.params.id})
        .then(result => {
            res.redirect("/admin/posts");
    });
})

module.exports = router;