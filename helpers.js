/*  module.exports.title = "Node";
module.exports.title2 = "Node2";

module.exports.cal = function() {
    console.log("Hellow");
}
console.log(module.exports.cal());

*/

const object = require("./lib"); // v isti mapi kot ta fajl

console.log(object.cal(22, 23));  // kličemo funkcijo iz knjižnice, modul/funkcije so dosegljive globalno

console.log(object.someProperty);  // kličemo še eno funkcijo iz knjižnice