const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controllers/imageuploadfirebase.controller");

const ImageControler = require("../controllers/image.controller");

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router
  .route("/")
  .post(upload.single("image"), controller.uploadImagefirebaseController)
  .get(ImageControler.getImageController);

module.exports = router;
