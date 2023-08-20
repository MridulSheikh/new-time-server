const express = require("express");
const router = express.Router();
const controller = require("../controllers/brand.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyadmin = require("../middlewares/verifyadmin");

router
  .route("/")
  .post(verifyToken,verifyadmin,controller.createBrandController)
  .get(controller.getBrandController);

router
  .route("/:id")
  .get(verifyToken,verifyadmin,controller.getBrandByIdController)
  .delete(verifyToken,verifyadmin,controller.deleteBrandController)
  .patch(verifyToken,verifyadmin,controller.updateBrandController);
module.exports = router;
