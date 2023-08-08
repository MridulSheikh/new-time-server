const Brand = require("../models/brand.models");

exports.createBrandService = async (data) => {
  return Brand.create(data);
};

exports.getBrandService = async () => {
  return Brand.find({});
};

exports.getBrandbyIdService = async (id) => {
  return Brand.findOne({ _id: id });
};

exports.updateBrandService = async (id, data) => {
  return Brand.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

exports.deleteBrandService = async (id) => {
  return Brand.deleteOne({ _id: id });
};

exports.addProductonBrand = async (id, data) => {
  return Brand.updateOne({ _id: id }, { $push: { products: data } });
};

exports.removedProductsFromBrand = async (id, data) => {
  return Brand.updateOne({ _id: id }, { $pull: { products: data } });
};
