const fs = require("fs");

fs.writeFile("./modules/data.html", "Hello this file is just bein created \n\n", "utf8", (err) => {
    if(err) return err;
        
    console.log("The file has been saved");
         
});

fs.appendFile("./modules/data.html", "Extra data appended to this file", "utf8", (err) => {
    if(err) return err;
        
    console.log("The file has updated");
         
});