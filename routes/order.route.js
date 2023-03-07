const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller")

router.route("/")
.post(controller.createOrderController)
.get(controller.getOrderController)
.patch(controller.updateOrderController)

router.route("/:id")
.get(controller.getOrderByIdController)
.delete(controller.deleteOrderController)
module.exports = router;