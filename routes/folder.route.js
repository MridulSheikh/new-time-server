const express = require("express");
const router = express.Router();
const controller = require("../controllers/folder.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyadmin = require("../middlewares/verifyadmin");

router
  .route("/")
  .post(verifyToken,verifyadmin,controller.createFolderController)
  .get(verifyToken,verifyadmin,controller.getFolderController);

router
  .route("/:id")
  .delete(verifyToken,verifyadmin,controller.deleteCategoryController)
  .patch(verifyToken,verifyadmin,controller.updateFolderController)
  .get(verifyToken,verifyadmin,controller.getFolderById);

module.exports = router;
