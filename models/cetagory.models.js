const { strikethrough } = require("colors");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cetagorySchema = mongoose.Schema(
  {
    createby: {
      type: String,
      required: [true, "require authon true"],
    },
    name: {
      type: String,
      required: [true, "require cetagory name"],
      unique: true,
      lowercase: true,
    },
    products: [
      {
        id: {
          type: ObjectId,
          ref: "Product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const cetagory = mongoose.model("Cetagory", cetagorySchema);

module.exports = cetagory;
