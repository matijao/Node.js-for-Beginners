console.log(process.argv);

process.stdout.write("WHAT IS YOUR NAME?")

process.stdin.on('data', function(answer){

    console.log(answer.toString().trim());

    process.exit();

})

