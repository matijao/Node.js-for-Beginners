const emitter = require("./modules/SendEmail");




emitter.on("emailEvent", (message) => {

    console.log(`Email: ${message}`);

} );

emitter.emit("emailEvent", "Send email to user after registration");