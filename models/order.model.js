const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
      email : {
        type : String,
        required : [true, "please provide a email address"]
      },
      phone : {
        type : String,
        required : [true, "please provide a phone number"]
      },
      country : {
        type : String,
        required : [true, "please provide your country"]
      },
      address : {
        type : String,
        required : [true, "please provide a address"]
      },
      paidprice : {
        type : Number,
        required : [true, "required paid price"]
      },
      status : {
        type : String,
        enum : ["pending", "shipped", "done"],
        default : "pending"
      },
      orderproduct : [
        {
          id : String,
          img : String,
          name : String,
          price : Number,
          quantity : Number,
        }
      ]
},{
    timestamps: true,
})

const order = mongoose.model("Order", orderSchema);
module.exports = order;
