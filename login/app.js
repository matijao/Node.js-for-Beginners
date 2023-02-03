const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user");
const bcrypt = require("bcryptjs");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/login", {useMongoClient: true}, () => {
    console.log("Connected");
});

app.post("/register",(req, res) => {

    const newUser = new User();

    newUser.email = req.body.email;
    newUser.password = req.body.password;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) return err;

            newUser.password = hash;

            newUser.save().then(userSaved => {

                res.send("User saved" + newUser);
            
        
            }).catch((err) => {
        
                res.send("User was not saved because "+err);
        
            });   
        });
    });
});

app.post("/login", (req, res) => {

    User.findOne({email: req.body.email}).then(user => {
        if (user){
            bcrypt.compare(req.body.password, user.password, (err, matched) =>{
                if(err) return err;
                if(matched){
                    res.send("User logged in")
                } else {
                    res.send("Not able to login")
                }

            });
        }
    });
})   


app.listen(4321, () => {
    console.log("listening on port 4321");
});
