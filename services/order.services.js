const Order = require("../models/order.model")

exports.createOrderService= async (data)=>{
       return Order.create(data);
}

exports.getOrderService = async (query) => {
        return await Order.find(query).sort({createdAt : -1})
}

exports.getOrderbyIdService = async (id) => {
        return Order.findOne({_id : id})
}

exports.updateOrderService = async (data) => {
        return Order.updateOne({_id : data.id}, data,{
            runValidators: true
        })
}

exports.deleteOrderService = async (id) => {
       return Order.deleteOne({_id : id})
}