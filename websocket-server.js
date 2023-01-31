const WebSocketServer = require("ws").Server;
const WSS = new WebSocketServer ({port: 3232});

WSS.on("connection", (ws) => {

    ws.on("message", (message) => {  // listener; ws je naš klient

        if (message === "close") {
            ws.close();
        } else {
             WSS.clients.forEach((client) => {
            client.send(message);
            
        });
        }

       
        //console.log(message);  //dobimo informacijo od klienta
    });  

    //console.log("We are connected");


})