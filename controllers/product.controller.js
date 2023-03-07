const {
  createProductService,
  getProductService,
  getProductbyIdService,
  updateProductService,
  deleteProductService,
} = require("../services/product.services");

exports.getProdcutController = async (req, res) => {
  try {
    const result = await getProductService();
    if (result.length === 0) {
      res.status(404).json({
        statuscode: 404,
        message: "Product Not Found",
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Product Found",
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

exports.createProductController = async (req, res) => {
  try {
    const result = await createProductService(req.body);
    if (result.title) {
      res.status(200).json({
        statuscode: 200,
        message: "successfully created product",
        data: result,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message:
          "The product has not been added. please Check the product data again",
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

exports.getProductByIdController = async (req, res) => {
  try {
    const result = await getProductbyIdService(req.params.id);
    if (result === null) {
        res.status(404).json({
        statuscode: 404,
        message: "Product Not Found",
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Product Found",
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

exports.updateProductController = async (req, res) => {
  try {
    const result = await updateProductService(req.body)
    if(result.modifiedCount > 0){
      res.status(200).send({
        statuscode: 200,
        message: "Product successfuly update",
        data : req.body
      });
    }else{
      res.status(401).json({
        errorcode: 401,
        message:
          "make sure you are given right product id or data",
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

exports.deleteProductController = async (req, res) => {
  try{
      const result = await deleteProductService(req.params.id)
      if(result.deletedCount > 0){
        res.status(200).json({
          statuscode : 200,
          message : "Product successfuly deleted"
        })
      }else{
        res.status(401).json({
          errorcode: 401,
          message:
            "product not found",
        });
      }
  }catch(error){
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message:
        "please check you network collection or please send a email for support",
    });
  }
}