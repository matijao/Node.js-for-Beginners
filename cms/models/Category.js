const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema ({

    name:{

        type: String,
        require: true

    }
});

module.exports = mongoose.model("categories", CategorySchema);

// v bazi se kreira tabela v množini Post -> Posts, če ni že prej v množini