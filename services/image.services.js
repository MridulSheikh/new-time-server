const image = require("../models/image.model");

exports.createImageService = async (body) => {
  return image.create(body);
};

exports.getImageService = async () => {
  return image.find({});
};

exports.getImagebyIdService = async (id) => {
  return image.findOne({ _id: id });
};

exports.deletImageService = async (id) => {
  return image.deleteOne({ _id: id });
};

exports.updateImageByid = async (id, body) => {
  return image.updateOne({ _id: id }, body);
};
