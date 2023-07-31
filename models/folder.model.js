const mongoose = require("mongoose");
const validator = require("validator");

const folderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide folder name"],
      unique: true,
    },
    create_by: {
      type: String,
      validate: [validator.isEmail, "Please Provid a valid email"],
    },
    resources: {
      type: mongoose.Types.ObjectId,
      ref: "Resources",
    },
  },
  {
    timestamps: true,
  }
);
const folder = mongoose.model("Folder", folderSchema);
module.exports = folder;
