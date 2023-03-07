const express = require("express");
const router = express.Router();
const controller = require("../controllers/feedback.controller")

router.route("/")
.post(controller.createFeedbackController)
.get(controller.getFeedbackController)
.patch(controller.updateFeedbackController)

router.route("/:id")
.delete(controller.deleteFeedbackController)
module.exports = router;