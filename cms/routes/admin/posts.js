const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const Category = require("../../models/Category")
const { isEmpty, uploadDir } = require("../../helpers/upload-helper");
const fs = require("fs");
const path = require("path");
const { userAuthenticated } = require("../../helpers/authentication");


router.all("/*", userAuthenticated, (req, res, next) => {   // all after "/admin"

    req.app.locals.layout = "admin";  // overwrite, če pride kdo do "/admin/*"
    next();


}); 

router.get("/", (req, res) => {

    Post.find({})
    .populate("category")
    .then(posts => {

    res.render("admin/posts", {posts: posts});
    });
});

router.get("/create", (req, res) => {

    Category.find({}).then(categories => {
    res.render("admin/posts/create", {categories:categories});

    });   
});

router.get("/my-posts", (req, res) => {

    Post.find({user: req.user.id})
    .populate("category")
    .then(posts => {

    res.render("admin/posts/my-posts", {posts: posts});
    });


});

router.post("/create*", (req, res) => {

    let filename = "jpg";

    if(!isEmpty(req.files)){

        let file = req.files.file;
        filename = Date.now() + "-" + file.name;
        let dirUploads = "./public/uploads/"

        file.mv(dirUploads + filename, (err) =>{  //mv = move
            if(err) throw err;

        });
        console.log("Is not empty");
    }

    //console.log(req.files);

    let allowComments = true;

    if (req.body.allowComments){
        allowComments = true;
    } else {
        allowComments = false;
    }

    const newPost = new Post({

        user: req.user.id,
        title: req.body.title,
        status: req.body.status,
        allowComments: allowComments,
        body: req.body.body,
        category: req.body.category,
        file: filename

    });

    newPost.save().then(savedPost => {

        req.flash("success_message",`Post ${savedPost.title} was created successfully `);


        console.log(savedPost);
        res.redirect("/admin/posts");
    }).catch(err => {
        
        console.log(err, "could not save data");
    });


    
});


router.get("/edit/:slug", (req, res) => {

    Post.findOne({slug: req.params.slug}).then(post => {
        Category.find({}).then(categories => {

            res.render("admin/posts/edit", {post: post, categories: categories});
        });

    });
    // res.send(req.params.id);
    // res.render("admin/posts/edit");
});


router.put("/edit/:slug", (req, res) => {

    //res.send("It workss");

    Post.findOne({slug: req.params.slug}).then(post => {

        if (req.body.allowComments){
            allowComments = true;
        } else {
            allowComments = false;
        }

        post.user = req.user.id;
        post.title = req.body.title;
        post.status = req.body.status;
        post.allowComments = allowComments;
        post.category = req.body.category,
        post.body = req.body.body;

        if(!isEmpty(req.files)){

            let file = req.files.file;
            filename = Date.now() + "-" + file.name;
            let dirUploads = "./public/uploads/"
            post.file = filename;
    
            file.mv(dirUploads + filename, (err) =>{  //mv = move
                if(err) throw err;

            });
            //console.log("Is not empty");
        }

        post.save().then(updatedPost=> {
            req.flash("success_message", "Post was successfully updated");
            res.redirect("/admin/posts/my-posts");
        })
        //res.render("admin/posts/edit", {post: post});
        });
})

router.delete("/:slug", (req, res) => {
    Post.findOne({slug: req.params.slug})
        .populate("comments")
        .then(post => {


            fs.unlink (uploadDir + post.file, (err) => {
                //req.flash("success_message","Post was successfully deleted");
            post.remove();
            res.redirect("/admin/posts/my-posts");
            req.flash("success_message", "Post was successfully deleted");

                if(!post.comments.length < 1) {

                    post.comments.forEach(comment => {

                        comment.remove().then(postRemoved => {

                        });

                    })

                }

            })

    });
})

module.exports = router;