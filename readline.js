const readline = require("readline");
const util = require("util");


var RL = readline.createInterface(process.stdin, process.stdout);

RL.question("What is you name? ", (name) => {

    RL.setPrompt(`${name} how old are you? `);

    RL.prompt();    
    //console.log(name);

    RL.on("line", (age) => {  // <--"on" pomeni, da se zgodi "built-in event", ko kaj vpišemo v linijo 

        if (age < 18){

            util.log(`${name.trim()} because you are ${age} years old, you cannot proceed`);
            //util.log doda še timestamp
        }

        else {

            util.log(`${name.trim()} is great that you are ${age} years old, because now you can enjoy our services`);

        }

        RL.close();

    });

});