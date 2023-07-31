const express = require("express");
const router = express.Router();
const controller = require("../controllers/folder.controller");

router
  .route("/")
  .post(controller.createFolderController)
  .get(controller.getFolderController);

router.route("/:id").delete(controller.deleteCategoryController);

module.exports = router;
