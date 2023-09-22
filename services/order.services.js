const Order = require("../models/order.model")

exports.createOrderService= async (data)=>{
       return Order.create(data);
}

exports.getOrderService = async (filters,query) => {
        return await Order.find(filters)
        .skip(query.skip)
        .limit(query.limit)
        .select(query.fields)
        .sort(query.sort)
        .populate(query.populate)
}

exports.getOrderbyIdService = async (id) => {
        return Order.findOne({_id : id})
}

exports.updateOrderService = async (id,data) => {
        return Order.updateOne({_id : id}, data,{
            runValidators: true
        })
}

exports.deleteOrderService = async (id) => {
       return Order.deleteOne({_id : id})
}