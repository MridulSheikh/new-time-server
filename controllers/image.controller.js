const {
  createImageService,
  getImageService,
  updateImageByid,
  getImagebyIdService,
} = require("../services/image.services");
const {
  addImageInFolderController,
} = require("../controllers/folder.controller");

exports.createImageController = async (data, res) => {
  try {
    const result = await createImageService(data);
    if (result.name) {
      addImageInFolderController(result.folder, result, res);
    } else {
      res.status(401).json({
        errorcode: 401,
        errormessage: "The Image has not been added",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
    });
  }
};

exports.getImageController = async (req, res) => {
  try {
    const result = await getImageService();
    if (result.length === 0) {
      res.status(404).json({
        statuscode: 200,
        message: "Image not found",
        data: result,
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Image Found",
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

exports.updateImageController = async (req, res) => {
  try {
    const result = await updateImageByid(req.params.id, req.body);
    if (result.modifiedCount > 0) {
      res.status(200).send({
        statuscode: 200,
        message: "Image Successfully renamed",
        data: req.body,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        errormessage: "make sure you are given right Image id or data",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: "This Name Already Taken",
    });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const result = await getImagebyIdService(req.params.id);
    if (result === null) {
      res.status(401).json({
        errorcode: 401,
        message: "Image Not Found",
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Image Found",
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
