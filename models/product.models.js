const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema(
  {
    img: {
      type: String,
      validate: [validator.isURL, "Plese provide a valid link"],
    },
    name: {
      type: String,
      required: [true, "product title required"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "prodcut description required"],
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
      required: [true, "Brand is Required"],
    },
    category: {
      type: ObjectId,
      ref: "Cetagory",
      required: [true, "Category is Required"],
    },
    price: {
      type: Number,
      require: [true, "product price required"],
    },
    reviews: [
      {
        email: {
          type: String,
        },
        ratting: {
          type: Number,
        },
        review: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
