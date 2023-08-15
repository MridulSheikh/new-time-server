const Product = require("../models/product.models");

exports.createProductService = async (data) => {
  return Product.create(data);
};

exports.getProductService = async (filters, query) => {
  const products = await Product.find(filters)
    .skip(query.skip)
    .limit(query.limit)
    .select(query.fields)
    .sort(query.sort)
    .populate(query.populate);
  const total = await Product.countDocuments(filters);
  const pagecount = Math.ceil(total / query.limit);
  return { products, total, pagecount };
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

exports.addRatting = async (id, data) => {
  return Product.updateOne(
    { _id: id },
    { $push: { reviews: data } },
    {
      runValidators: true,
    }
  );
};
