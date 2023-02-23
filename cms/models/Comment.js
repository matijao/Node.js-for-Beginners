const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema ({


    user: {

        type: Schema.Types.ObjectId,
        ref: "users"

    },

    body:{

        type: String,
        require: true

    },

    date:{

        type: Date,
        default: Date.now()

    },
    
});

module.exports = mongoose.model("comments", CommentSchema);

// v bazi se kreira tabela v množini Post -> Posts, če ni že prej v množini