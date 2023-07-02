const {
  createCategoryService,
  getCategoryService,
  getCategorybyIdService,
  updateCategoryService,
  deleteCategoryService,
} = require("../services/cetagory.services");

exports.getCategoryController = async (req, res) => {
  try {
    const result = await getCategoryService();
    if (result.length === 0) {
      res.status(200).json({
        statuscode: 200,
        message: "Please add some category",
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Cetagory Found",
        data: result,
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message:
        "please check you network collection or please send a email for support",
    });
  }
};

exports.createCetagoryController = async (req, res) => {
  try {
    const result = await createCategoryService(req.body);
    if (result.name) {
      res.status(200).json({
        statuscode: 200,
        message: "successfully created Cetagory",
        data: result,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message:
          "The cetagory has not been added. please Check the cetagory data again",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message: "Duplicate category detacted",
    });
  }
};

exports.getCategoryByIdController = async (req, res) => {
  try {
    const result = await getCategorybyIdService(req.params.id);
    if (result === null) {
      res.status(404).json({
        statuscode: 404,
        message: "Category Not Found",
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Category Found",
        data: result,
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message:
        "please check you network collection or please send a email for support",
    });
  }
};

exports.updateCategoryController = async (req, res) => {
  try {
    const result = await updateCategoryService(req.body);
    if (result.modifiedCount > 0) {
      res.status(200).send({
        statuscode: 200,
        message: "Category successfuly update",
        data: req.body,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message: "make sure you are given right cetagory id or data",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message:
        "please check you network collection or please send a email for support",
    });
  }
};

exports.deleteCategoryController = async (req, res) => {
  try {
    const result = await deleteCategoryService(req.params.id);
    if (result.deletedCount > 0) {
      res.status(200).json({
        statuscode: 200,
        message: "Category successfuly deleted",
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message: "Category not found",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message:
        "please check you network collection or please send a email for support",
    });
  }
};
