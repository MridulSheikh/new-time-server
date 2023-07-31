const Category = require("../models/cetagory.models");

exports.createCategoryService = async (data) => {
  return Category.create(data);
};

exports.getCategoryService = async () => {
  return Category.find({});
};

exports.getCategorybyIdService = async (id) => {
  return Category.findOne({ _id: id });
};

exports.updateCategoryService = async (data) => {
  return Category.updateOne({ _id: data.id }, data, {
    runValidators: true,
  });
};

exports.deleteCategoryService = async (id) => {
  return Category.deleteOne({ _id: id });
};
