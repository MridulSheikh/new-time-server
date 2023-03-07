const Product = require("../models/product.models")

exports.createProductService= async (data)=>{
       return Product.create(data);
}

exports.getProductService = async () => {
        return Product.find({});
}

exports.getProductbyIdService = async (id) => {
        return Product.findOne({_id : id})
}

exports.updateProductService = async (data) => {
        return Product.updateOne({_id : data.id}, data,{
            runValidators: true
        })
}

exports.deleteProductService = async (id) => {
       return Product.deleteOne({_id : id})
}