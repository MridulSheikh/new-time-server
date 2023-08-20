const express = require("express");
const router = express.Router();
const controller = require("../controllers/cetagory.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyadmin = require("../middlewares/verifyadmin");

router.route("/")
.post(verifyToken,verifyadmin,controller.createCetagoryController)
.get(controller.getCategoryController)
.patch(verifyToken,verifyadmin,controller.updateCategoryController)

router.route("/:id")
.get(verifyToken,verifyadmin,controller.getCategoryByIdController)
.delete(verifyToken,verifyadmin,controller.deleteCategoryController)
module.exports = router;