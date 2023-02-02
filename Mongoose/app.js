// const MongoClient = require("mongodb").MongoClient; 
// enako tudi: const {MongoClient} = require("mongodb");

const {MongoClient, ObjectId} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017", function (err, client){
  
  if(err) throw err;

  //console.log(ObjectId());

  // const object = new ObjectId();

 // console.log(object);

  console.log("Connected");
  

  // -- KOMENTAR -- Mongoose poskrbi za strukturo 'schema', prvotno pa je mongodb 'schemaless, kar pomeni, da lahko pišeš v bazo karkoli


  const db = client.db("animals");
/* 
// -- CREATE DATA --
  db.collection("mammals").insertOne({
    name: "cat",
    legs: 4

  }, (err,result) => {
    if(err) {return console.log(err)}

    console.log("Inserted");
*/
 // });  





/* mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (err) => {
    console.log("Could not connect", err);
  }); */


/* const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/animals', (err, db) => {
  if (err) throw err */




  

// -- UPDATE DATA --
/*   db.collection('mammals').findOneAndUpdate({

    _id: new ObjectId("63dac1a7bc2e325758cf3fb4")


  //})
  }, { $set: {name: "tiger", legs: 4} 

  }).then(result => {
    console.log(result);
  }).catch(err => {
    console.log(err);
  }); */




// -- DELETING DATA --
// db.collection("mammals").deleteMany({name: "Matija"});

db.collection("mammals").findOneAndDelete({
  _id: new ObjectId("63dac308f65d501388ae4110")
}).then(result => {
  console.log(result);
}).catch(err => {
  console.log(err);
});




// -- READING DATA --
  db.collection('mammals').find().toArray((err, result) => {
    if (err) throw err

    console.log(result)
  //})
})





});