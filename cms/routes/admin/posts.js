const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const { isEmpty, uploadDir } = require("../../helpers/upload-helper");
const fs = require("fs");
const path = require("path");




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

    let filename = "IMG_20230202_202328_edit_213120010509144.jpg";

    if(!isEmpty(req.files)){

        let file = req.files.file;
        filename = Date.now() + "-" + file.name;
        let dirUploads = "./public/uploads/"

        file.mv(dirUploads + filename, (err) =>{  //mv = move
            if(err) throw err;

        });
        console.log("Is not empty");
    }

    console.log(req.files);

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
        body: req.body.body,
        file: filename

    });

    newPost.save().then(savedPost => {
        console.log(savedPost);
        res.redirect("/admin/posts");
    }).catch(err => {
        
        console.log(err, "could not save data");
    });


    
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
    Post.findOne({_id: req.params.id})
        .then(post => {

            post.remove();

            fs.unlink (uploadDir + post.file, (err) => {
                //req.flash("success_message","Post was successfully deleted");
                res.redirect("/admin/posts");
            })

    });
})

module.exports = router;