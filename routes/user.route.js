const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyFirebseToken = require("../middlewares/verifyFirebseToken");
const verifyToken = require("../middlewares/verifyToken");
const verifyadmin = require("../middlewares/verifyadmin");

router
  .route("/")
  .post(verifyFirebseToken, userController.createUserController)
  .get(verifyToken,verifyadmin,userController.getUserController);

router.route("/verify/:email").post(userController.emailVarify);
router.route("/confirm").post(userController.emailConfirm)

router
  .route("/:email")
  // .get(userController.getUserByIdController)
  .patch(verifyToken,verifyadmin, userController.userUpdateByIdController);

module.exports = router;
