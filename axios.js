const axios = require("axios");

let username = "matija";

axios.get(`https://api.github.com/users/` + username).then((res) => {

    console.log(res.data);

}).catch((err) => {

    console.log(err);

});