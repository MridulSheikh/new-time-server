const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const brandSchema = mongoose.Schema(
  {
    logo: {
      type: String,
      validate: [validator.isURL, "provide a valid photo url"],
    },
    name: {
      type: String,
      required: [true, "please provide brand name"],
      unique: true,
      upercase: true,
      trim: true,
    },
    number: {
      type: String,
      required: [true, "please provide supplier number"],
    },
    products: [
      {
        type: ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
