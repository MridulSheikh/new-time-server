const express = require("express");
const router = express.Router();
const controller = require("../controllers/payment.controller")

router.route("/")
.post(controller.paymentController)

module.exports=router