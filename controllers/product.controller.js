const {
  createProductService,
  getProductService,
  getProductbyIdService,
  updateProductService,
  deleteProductService,
} = require("../services/product.services");
const {
  addProductonBrand,
  removedProductsFromBrand,
} = require("../services/brand.services");
const {
  removedProductsFromCategory,
  addProductonCategory,
} = require("../services/cetagory.services");

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
    if (result.name) {
      const setProductOnBrand = await addProductonBrand(
        req.body.brand,
        result._id
      );
      const setProductOnCategory = await addProductonCategory(
        req.body.category,
        result._id
      );
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
      message: error.message,
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
    const result = await updateProductService(req.params.id, req.body);
    if (result.modifiedCount > 0) {
      res.status(200).send({
        statuscode: 200,
        message: "Product successfuly update",
        data: req.body,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message: "make sure you are given right product id or data",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message: error.message,
    });
  }
};

exports.deleteProductController = async (req, res, next) => {
  try {
    let per_action_message = [];
    const mapitem = await req.body.item.map(async (it) => {
      const result = await deleteProductService(it._id);
      if (result.deletedCount > 0) {
        try {
          const deleteProductfromBrand = await removedProductsFromBrand(
            it?.brand?._id,
            it._id
          );
          const deleteProductfromCategory = await removedProductsFromCategory(
            it?.category?._id,
            it._id
          );
          per_action_message.push(
            `suceesfully deleted product, name : ${it._id} , id ${it._id}`
          );
        } catch (error) {
          console.log(error);
        }
      } else {
        per_action_message.push(
          ` product not successfully deleted , name : ${it._id} , id ${it._id}`
        );
      }
    });
    res.status(200).json({
      statuscode: 200,
      message: "successfully deleted product",
      per_action_message,
    });
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
    });
  }
};
