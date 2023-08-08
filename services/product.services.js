const Product = require("../models/product.models");

exports.createProductService = async (data) => {
  return Product.create(data);
};

exports.getProductService = async () => {
  return Product.find({}).populate("brand category");
};

exports.getProductbyIdService = async (id) => {
  return Product.findOne({ _id: id }).populate("brand category");
};

exports.updateProductService = async (id, data) => {
  return Product.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

exports.deleteProductService = async (id) => {
  return Product.deleteOne({ _id: id });
};
