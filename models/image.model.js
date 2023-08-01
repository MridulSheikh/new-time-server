const mongoose = require("mongoose");
const validator = require("validator");

const imageSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide image name"],
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      validate: [validator.isURL, "Please Provid a valid url"],
    },
    create_by: {
      type: String,
      validate: [validator.isEmail, "Please Provid a valid email"],
    },
    folder: {
      type: mongoose.Types.ObjectId,
      ref: "Folder",
    },
  },
  {
    timestamps: true,
  }
);
const image = mongoose.model("Image", imageSchema);
module.exports = image;
