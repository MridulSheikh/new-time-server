const image = require("../models/image.model");

exports.createImageService = async (body) => {
  return image.create(body);
};

exports.getImageService = async () => {
  return image.find({});
};
exports.deletImageService = async (id) => {
  return image.deleteOne({ _id: id });
};
