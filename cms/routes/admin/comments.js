const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const Comment = require("../../models/Comment");


router.all("/*", (req, res, next) => {   // all after "/admin"

    req.app.locals.layout = "admin";  // overwrite, če pride kdo do "/admin/*"
    next();

}); 

router.get("/",(req, res) => {

    Comment.find({user: req.user.id}).populate("user")
    
        .then(comments => {

        res.render("admin/comments", {comments: comments});

    })

});

router.post("/",(req, res) => {

    Post.findOne({_id: req.body.id}).then(post=>{

        

        const newComment = new Comment ({
            user: req.user.id,
            body: req.body.body
        });

        console.log(newComment);
        console.log(post);

        post.comments.push(newComment);

        post.save().then(savedPost => {

            newComment.save().then(savedComment => {

                res.redirect(`/post/${post.id}`);

            });

        });

    });

    //res.send("works");

});

router.delete("/:id", (req, res) => {
    Comment.remove({_id: req.params.id})
        .then(deleteItem => {

            Post.findOneAndUpdate({comments: req.params.id}, {$pull: {comments: req.params.id}}, (err, data) => {

                if(err) console.log(err);
                
                req.flash("success_message", "Comment was successfully deleted");

                res.redirect("/admin/comments");
            });

            


    });
})

module.exports = router;