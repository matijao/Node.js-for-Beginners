const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema ({

     firstName:{

        type: String,
        require: true

    },

    lastName:{

        type: String,
        require: true

    },

    email:{

        type: String,
        require: true

    },

    password: {

        type: String,
        require: true
    }

});

UserSchema.methods.testMethod = function(){

};


module.exports = mongoose.model("users", UserSchema);

// v bazi se kreira tabela v množini Post -> Posts, če ni že prej v množini