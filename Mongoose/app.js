const mongoose = require("mongoose");
const User = require("./models/User");
const express = require("express");
const app = express();
const bodyParser = require ("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.Promise = global.Promise;


mongoose.connect("mongodb://localhost:27017/mongoose");
mongoose.connection
    .once("open", () => console.log("Connected"))
    .on("error", (err) => {
        console.log("could not connect", err)
    });

// app.post("/users");

app.get("/", (req, res) => {

  res.send("ROOT")

});

app.post("/users", (req, res) => {

const newUser = new User({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  isActive: req.body.isActive,
});

newUser.save().then(savedUser => {

  console.log("saved user");
  res.send("User saved");

}).catch(err => {

  res.status(404).send("User not saved");

});


});



// -- GET DATA FROM DB
app.get("/users", (req, res) => {
  User.find({}).then(users => {// findOne() -> find specific record/document
    res.send(users);
  
  });

});

// -- PATCH or PUT    //PUT[all fields replaced], PATCH[only specified fields replaced]
/* app.patch("/users/:id", (req, res) => {
  const id = req.params.id;
  const firstName = req.body.firstName;

  User.findByIdAndUpdate({_id: id}, {$set: {firstName: firstName}}, {new: true})
    .then(savedUser => {
      res.send("User saved by patch")
    })
}) */

/* app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  User.findByIdAndUpdate({_id: id}, {$set: {firstName: firstName, lastName: lastName}}, {new: true})
    .then(savedUser => {
      res.send("User saved by put")
    })
}) */

/* app.put("/users/:id", (req, res) => {  // To je alternativa prejšnjemu PUT-u
  const id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  User.findOne({_id: id}).then(user => {
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;

    user.save().then(userSaved => {
      res.send(userSaved);

    });
  });
}); */


// -- DELETE RECORD
/* app.delete("/users/:id", (req, res) => {  // To je alternativa prejšnjemu PUT-u
  const id = req.params.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  User.findOne({_id: id}).then(user => {
    user.remove().then(userRemoved => {
      res.send("User remove" + userRemoved);
    });


  });
}); */

/* app.delete("/users/:id", (req, res) => {  // To je alternativa prejšnjemu PUT-u
  User.findOneAndRemove({_id: req.params.id}).then(userRemoved => {
      res.send("User removed:" + userRemoved.firstName);
  });
}); */

app.delete("/users/:id", (req, res) => {  // To je alternativa prejšnjemu PUT-u
  User.remove({_id: req.params.id}).then(userRemoved => {
      res.send("User removed:" + userRemoved.firstName);
  });
});

// ODM - OBJECT DOCUMENT MAPPER


const port = 4444 || process.env.port;

app.listen(port, () => {

  console.log(`listening on ${port}`);

});