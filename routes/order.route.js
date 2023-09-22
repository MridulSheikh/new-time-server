const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller");
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyadmin")


router.route("/")
.post(verifyToken,controller.createOrderController)
.get(verifyToken,controller.getOrderController)

router.route("/confirm")
.post(controller.confirmOrder)

router.route("/verify")
.post(verifyToken,controller.verifyOrder)

router.route("/:id")
.get(controller.getOrderByIdController)
.delete(controller.deleteOrderController)
.patch(verifyToken,verifyAdmin,controller.updateOrderController)
module.exports = router;