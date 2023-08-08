const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");

router
  .route("/")
  .post(controller.createProductController)
  .get(controller.getProdcutController)
  .delete(controller.deleteProductController);

router
  .route("/:id")
  .get(controller.getProductByIdController)
  .patch(controller.updateProductController);

module.exports = router;
