const Folders = require("../models/folder.model");

exports.createFolderService = async (body) => {
  return Folders.create(body);
};

exports.getFolderService = async () => {
  return Folders.find({});
};

exports.getFolderByIdService = async (id) => {
  return Folders.findOne({ _id: id }).populate("resources");
};

exports.deletFolderService = async (id) => {
  return Folders.deleteOne({ _id: id });
};

exports.updateFolderServices = async (id, body) => {
  return Folders.updateOne({ _id: id }, body, {
    runValidators: true,
  });
};

exports.removeImageFromFolderServices = async (id, image_id) => {
  return Folders.updateOne(
    { _id: id },
    { $pull: { resources: image_id } },
    {
      runValidators: true,
    }
  );
};
