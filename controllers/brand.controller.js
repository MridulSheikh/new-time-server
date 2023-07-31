const {
  createBrandService,
  getBrandService,
  getBrandbyIdService,
  updateBrandService,
  deleteBrandService,
} = require("../services/brand.services");

exports.getBrandController = async (req, res) => {
  try {
    const result = await getBrandService();
    if (result.length === 0) {
      res.status(404).json({
        statuscode: 404,
        message: "Brand Not Found",
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Brand Found",
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

exports.createBrandController = async (req, res) => {
  try {
    const result = await createBrandService(req.body);
    if (result.name) {
      res.status(200).json({
        statuscode: 200,
        message: "successfully created Brand",
        data: result,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message:
          "The brand has not been added. please Check the cetagory data again",
      });
    }
  } catch (error) {
    res.status(400).json({
      errorcode: 400,
      errormessage: error.message,
      message:
        "please check you network collection or please send a email for support",
    });
  }
};

exports.getBrandByIdController = async (req, res) => {
  try {
    const result = await getBrandbyIdService(req.params.id);
    if (result === null) {
      res.status(404).json({
        statuscode: 404,
        message: "Brand Not Found",
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Brand Found",
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

exports.updateBrandController = async (req, res) => {
  try {
    const result = await updateBrandService(req.body);
    if (result.modifiedCount > 0) {
      res.status(200).send({
        statuscode: 200,
        message: "Brand successfuly update",
        data: req.body,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message: "make sure you are given right Brand id or data",
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

exports.deleteBrandController = async (req, res) => {
  try {
    const result = await deleteBrandService(req.params.id);
    if (result.deletedCount > 0) {
      res.status(200).json({
        statuscode: 200,
        message: "Brand successfuly deleted",
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message: "Brand not found",
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
