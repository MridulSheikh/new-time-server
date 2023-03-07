const mongoose = require('mongoose')

const feedbackSchema = mongoose.Schema({
    email : {
        type : String,
        required : [true, "please provide a user email"]
    },
    feedback : {
        type : String,
        required : true
    },
    status : {
        type: String,
        enum : ["show", "hidden"],
        default: "hidden",
    }
})

const feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = feedback;