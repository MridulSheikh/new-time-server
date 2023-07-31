const {
  createFolderService,
  getFolderService,
  deletFolderService,
} = require("../services/folder.services");

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
