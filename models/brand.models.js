const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please brand name"],
      unique: true,
      upercase: true,
    },
    email: {
      type: String,
      validator: [validator.isEmail, "provide a valid Email"],
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "please provide brand email address"],
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
const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
