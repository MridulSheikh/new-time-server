const express = require("express");
const router = express.Router();
const multer = require("multer");
const controller = require("../controllers/firebase.controller");

const ImageController = require("../controllers/image.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyadmin = require("../middlewares/verifyadmin");

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });

router
  .route("/")
  .post(verifyToken,verifyadmin,upload.single("image"), controller.uploadImagefirebaseController)
  .get(verifyToken,verifyadmin,ImageController.getImageController);

router
  .route("/:id")
  .delete(verifyToken,verifyadmin,upload.single("image"), controller.deleteImagefirebaseController)
  .patch(verifyToken,verifyadmin,ImageController.updateImageController)
  .get(verifyToken,verifyadmin,ImageController.getImageById);

module.exports = router;
