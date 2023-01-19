const execute = require('child_process').exec;

execute("dir", (err, stdout) => { // kličemo lahko katerokoli funkcijo, ki je na voljo v windowsih

    if(err){
        return err;
    }

    console.log(stdout);

});