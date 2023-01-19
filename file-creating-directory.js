const fs = require("fs");

fs.access("./views", function (error) {   //./view pogleda, če mapa že obstaja
    if(error) {
        console.log("The folder doesn't exists");

        fs.mkdir("views", function(error) {

            if(error) return error;

        fs.writeFile("./views/new.txt", "Hello", function (error) {
            console.log("We could write a file");

            });
        });
    }
});  