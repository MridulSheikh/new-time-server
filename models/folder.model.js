const mongoose = require("mongoose");
const validator = require("validator");

const folderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide folder name"],
      unique: true,
      trim: true,
    },
    create_by: {
      type: String,
      validate: [validator.isEmail, "Please Provid a valid email"],
    },
    resources: [
      {
        name: {
          type: String,
          trim: true,
        },
        id: {
          type: mongoose.Types.ObjectId,
          ref: "Image",
        },
        imageUrl: {
          type: String,
          validate: [validator.isURL, "Please Provid a valid url"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const folder = mongoose.model("Folder", folderSchema);
module.exports = folder;
