const fs = require ("fs");

fs.rmdirSync("./newDir");

try {

	fs.unlinkSync("./newdir/newFile.js");
	
} catch (err) {
	
	console.log(err + "here is the error");
	
}
	