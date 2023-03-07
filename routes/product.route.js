const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller")

router.route("/")
.post(controller.createProductController)
.get(controller.getProdcutController)
.patch(controller.updateProductController)

router.route("/:id")
.get(controller.getProductByIdController)
.delete(controller.deleteProductController)
module.exports = router;