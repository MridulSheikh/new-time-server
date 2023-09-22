const mongoose = require("mongoose")
const validator = require("validator")

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Blog title require"],
            unique : true,
        },
        cover : {
            type: String,
            required: [true, "blog cover require"],
            validator: [validator.isUrl, "please enter a valid image url"]
        },
        body : {
            type: String,
        },
        author : String,
    },
    {
        timestamps: true,
    }
);
const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog;