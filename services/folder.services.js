const Folders = require("../models/folder.model");

exports.createFolderService = async (body) => {
  return Folders.create(body);
};

exports.getFolderService = async () => {
  return Folders.find({});
};
exports.deletFolderService = async (id) => {
  return Folders.deleteOne({ _id: id });
};
