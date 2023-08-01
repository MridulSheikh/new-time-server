const {
  createFolderService,
  getFolderService,
  deletFolderService,
  updateFolderServices,
  getFolderByIdService,
  removeImageFromFolderServices,
} = require("../services/folder.services");
const { deletImageService } = require("../services/image.services");

exports.createFolderController = async (req, res) => {
  try {
    const result = await createFolderService(req.body);
    if (result.name) {
      res.status(200).json({
        statuscode: 200,
        message: "successfully created Folder",
        data: result,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message:
          "The folder has not been added. please Check the folder data again",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
    });
  }
};

exports.getFolderController = async (req, res) => {
  try {
    const result = await getFolderService();
    if (result.length === 0) {
      res.status(200).json({
        statuscode: 200,
        message: "You haven't create any folder",
        data: result,
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Folder Found",
        data: result,
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
    });
  }
};

exports.deleteCategoryController = async (req, res) => {
  try {
    const result = await deletFolderService(req.params.id);
    if (result.deletedCount > 0) {
      res.status(200).json({
        statuscode: 200,
        message: "Folder successfuly deleted",
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message: "Folder not found",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
    });
  }
};

exports.updateFolderController = async (req, res) => {
  try {
    const result = await updateFolderServices(req.params.id, req.body);
    if (result.modifiedCount > 0) {
      res.status(200).send({
        statuscode: 200,
        message: "Folder successfuly update",
        data: req.body,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        errormessage: "make sure you are given right Folder id or data",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: "This Name Already Taken",
    });
  }
};

exports.addImageInFolderController = async (id, image_data, res) => {
  try {
    const getSingleFolder = await getFolderByIdService(id);
    const newArray = [...getSingleFolder.resources];
    newArray.push({
      name: image_data.name,
      id: image_data._id,
      imageUrl: image_data.imageUrl,
    });
    const result = await updateFolderServices(id, { resources: newArray });
    res.status(200).json({
      statuscode: 200,
      message: "successfully created image",
    });
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
    });
  }
};

exports.removeImageFromFolderController = async (folder_id, image_id, res) => {
  try {
    const getSingleFolder = await getFolderByIdService(folder_id);
    const newArray = [...getSingleFolder.resources];
    const filterArray = newArray.map((image) => image.id != image_id);
    const result = await removeImageFromFolderServices(folder_id, image_id);
    const deleteimageFromdatabase = await deletImageService(image_id);
    res.status(200).json({
      statuscode: 200,
      message: "successfully delete image",
    });
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
    });
  }
};
