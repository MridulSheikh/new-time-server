const mongoose = require("mongoose")
const validator = require("validator")

const productSchema = mongoose.Schema(
    {  
       img : {
        type : String,
        required : true,
       },
       title : {
           type: String,
           required: [true, "product title required"],
           unique : true,
       },
       description : {
        type : String,
        required:[true, "prodcut description required"],
       },
       quantity : {
        type : Number,
        required : [true, "product quantity required"]
       },
       brand : {
         type : String,
         required : [true, "product brand required"]
       },
       category : {
        type : String,
        required : [true, "product Cetagory required"]
      },
      price : {
        type : Number,
        require : [true, "product price required"]
      }
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model("Product", productSchema)

module.exports = Product;