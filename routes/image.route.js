const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controllers/firebase.controller");

const ImageController = require("../controllers/image.controller");

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router
  .route("/")
  .post(upload.single("image"), controller.uploadImagefirebaseController)
  .get(ImageController.getImageController);

router
  .route("/:id")
  .delete(upload.single("image"), controller.deleteImagefirebaseController);

module.exports = router;
