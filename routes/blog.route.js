const express = require("express");
const router = express.Router();
const controller = require("../controllers/blog.controller")

router.route("/")
.post(controller.createBlogController)
.get(controller.getBlogController)

router.route("/getbytitle/:title")
.get(controller.getBlogByTitleController)

router.route("/:id")
.delete(controller.deleteBlogController)
.patch(controller.updateBlogController)
module.exports = router;