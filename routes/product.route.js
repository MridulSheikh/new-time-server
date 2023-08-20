const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyadmin = require("../middlewares/verifyadmin");

router
  .route("/")
  .post(verifyToken,verifyadmin,controller.createProductController)
  .get(controller.getProdcutController)
  .delete(verifyToken,verifyadmin,controller.deleteProductController);

router.route("/review/:id").patch(verifyToken,controller.addReviewsController);

router
  .route("/:id")
  .get(verifyToken,controller.getProductByIdController)
  .patch(verifyToken,verifyadmin,controller.updateProductController);

module.exports = router;
