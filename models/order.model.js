const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
       status : {
        type : String,
        enum : ["pending", "shipped", "delivered", "packed"],
        default : "pending"
       },
       total : Number,
       address : {
          country : String,
          number : String,
          state : String,
          post : String,
          email : String,
          address_1_line : String
       },
      confirm : {
        type : Boolean,
        enum : [true, false],
        default : false
      },
      paid : {
        type : Boolean,
        enum : [true, false],
        default : false
      },
      item : [
        {
          _id : String,
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
