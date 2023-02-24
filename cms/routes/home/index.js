const express = require("express");
const router = express.Router();
const Post = require("../../models/Post");
const Category = require("../../models/Category");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


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

router.get("/login", (req, res) => {

    res.render("home/login");

});

// APP LOGIN

passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done) => {

    //console.log(password);

    User.findOne({email: email}).then(user=>{

        if(!user){
            return done(null, false, {message: "No user found"});
        }
        

        bcrypt.compare(password, user.password, (err, matched) => {
            if(err) return err;

            if(matched) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Incorrect password."});
            }
        });
    })
}));

passport.serializeUser(function(user,done){
    done(null, user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id, function(err, user) {
        done(err, user);
    })
});    

router.post("/login", (req, res, next) => {

    passport.authenticate("local", {

        successRedirect: "/admin", //kam pošljemo userja, ki se je uspešno vpisal
        failureRedirect: "/login",
        failureFlash: true
    })(req, res, next);

});

router.get("/logout", (req, res) => {  //ko pritisnemo logout gumb

    req.logOut();

    res.render("home/login");

});

router.get("/register", (req, res) => {  //ko pritisnemo login gumb

    res.render("home/register");

});

router.post("/register", (req, res) => {

    let errors = [];

    if(!req.body.firstName) {
        errors.push({message: "please add first name"})
    }

    if(!req.body.lastName) {
        errors.push({message: "please add last name"})
    }

    if(!req.body.email) {
        errors.push({message: "please add email"})
    }

    if(!req.body.password) {
        errors.push({message: "please add password"})
    }

    if(req.body.password !== req.body.passwordConfirm) {
        errors.push({message: "passwords does not match"})
    }

    if(errors.length > 0){
        res.render("home/register", {

            errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
         

        })
    } else {

        User.findOne({email: req.body.email}).then(user=> {
            console.log(user);
            if(!user){

                const newUser = new User({

                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
            
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;

                        newUser.save().then(savedUser=>{
                            req.flash("success_message", "You are now registered")
                            res.redirect("/login");
                        });
                    });
                });
            } else {

                req.flash("error_message", "That mail already exist. Please login.");
                res.redirect("/login");
        }});  
    }
});

router.get("/post/:slug", (req, res) => {

    // Post.findOne({_id: req.params.id}).populate("comments") ČE ŽELIMO UVOZITI V POST SAMO KOMENTARJE
    Post.findOne({slug: req.params.slug})
    .populate({path: "comments", match: {approveComment: true}, populate: {path: "user", model: "users"}}) // TUKAJ JE V COMMENT ELEMENT V POST, USER PA JE ELEMENT V COMMENTU (avtor komentarja)
    .populate("user") // TUKAJ GRE ZA AVTORJA OBJAVE
    
    .then(post => { 
        console.log(post);
        Category.find({}).then(categories => {

            res.render("home/post", {post: post, categories: categories});

        });
    });
});

module.exports = router; // izvozimo skupaj s funkcijami