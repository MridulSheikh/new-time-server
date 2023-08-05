const express = require("express");
const router = express.Router();
const controller = require("../controllers/brand.controller");

router
  .route("/")
  .post(controller.createBrandController)
  .get(controller.getBrandController);

router
  .route("/:id")
  .get(controller.getBrandByIdController)
  .delete(controller.deleteBrandController)
  .patch(controller.updateBrandController);
module.exports = router;
