const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: [true, "product title required"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "prodcut description required"],
    },
    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    category: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Cetagory",
        required: true,
      },
    },
    price: {
      type: Number,
      require: [true, "product price required"],
    },
    reviews: [
      {
        email: {
          type: String,
          required: [true, "email required"],
        },
        ratting: {
          type: Number,
          required: [true, "ratting required"],
        },
        review: {
          type: String,
          required: [true, "review required"],
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
