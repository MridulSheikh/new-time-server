const mongoose = require("mongoose")

const cetagorySchema = mongoose.Schema(
    {
        createby : {
            type : String,
            required : [true, "require userName"],
        },
        name: {
            type: String,
            required: [true, "require cetagory name"],
            unique : true,
            lowercase : true,
        },
    },
    {
        timestamps: true,
    }
);
const cetagory = mongoose.model("Cetagory", cetagorySchema)

module.exports = cetagory;