const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller")

router
.route("/")
.post(userController.createUserController)
.get(userController.getUserController)

router
.route("/:email")
.get(userController.getUserByIdController)
.patch(userController.userUpdateByIdController)

module.exports=router