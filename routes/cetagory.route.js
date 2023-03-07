const express = require("express");
const router = express.Router();
const controller = require("../controllers/cetagory.controller")

router.route("/")
.post(controller.createCetagoryController)
.get(controller.getCategoryController)
.patch(controller.updateCategoryController)

router.route("/:id")
.get(controller.getCategoryByIdController)
.delete(controller.deleteCategoryController)
module.exports = router;