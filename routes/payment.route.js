const express = require("express");
const router = express.Router();
const controller = require("../controllers/payment.controller");
const verifyToken = require("../middlewares/verifyToken");

router.route("/")
.post(verifyToken,controller.paymentController)

module.exports=router