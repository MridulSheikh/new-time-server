const express = require("express");
const router = express.Router();
const controller = require("../controllers/blog.controller")
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyadmin")

router.route("/")
.post(verifyToken,verifyAdmin,controller.createBlogController)
.get(controller.getBlogController)

router.route("/getbytitle/:title")
.get(controller.getBlogByTitleController)

router.route("/:id")
.delete(verifyToken,verifyAdmin,controller.deleteBlogController)
.patch(verifyToken,verifyAdmin,controller.updateBlogController)
module.exports = router;