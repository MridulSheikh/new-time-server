const {
  createUserService,
  getUserService,
  getUserByIdService,
  userUpdatebyIdService,
} = require("../services/user.sevices");

const { sendMail } = require("../lib/email");
const { generateToken } = require("../utils/token");

exports.createUserController = async (req, res) => {
  try {
    const filter = await getUserByIdService(req.body.email);
    if (filter === null) {
      const result = await createUserService(req.body.email);
      if (result.email) {
        const token = generateToken({ email: result.email, role: "buyer" });
        res.status(200).json({
          status: "success",
          message: "successfully create user",
          body: { ...result, token: token },
        });
        return;
      }
    } else {
      const token = generateToken(filter);
      res.status(200).json({
        status: "success",
        message: "user successfully found",
        body: { ...filter, token: token },
      });
    }
  } catch (error) {
    res.status(401).json({
      staus: "fail",
      message: "user not created",
      error: error.message,
    });
  }
};

exports.getUserController = async (req, res) => {
  try {
    const user = await getUserService();
    if (user.length === 0) {
      return res.status(404).json({
        status: "fail",
        messgae: "users not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "user successfully found",
      body: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      messgae: "users not found",
    });
  }
};

exports.getUserByIdController = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.email);
    if (user === null) {
      return res.status(404).json({
        status: "fail",
        messgae: "user not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "user successfully found",
      body: user,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      messgae: "user not found",
    });
  }
};

exports.userUpdateByIdController = async (req, res) => {
  try {
    const result = await userUpdatebyIdService(req.params.email, req.body);
    if (result.modifiedCount === 0) {
      return res.status(401).send({
        status: "fail",
        messgae: "user role not changed",
      });
    }
    res.status(200).json({
      status: "success",
      message: "user role successfully changed",
    });
  } catch (error) {
    res.status(401).json({
      status: "fail",
      messgae: "user role not changed",
    });
  }
};

exports.emailVarify = async (req, res) => {
  try {
    const mailData = {
      to: [req.params.email],
      subject: "Time keeper - verify your email",
      text: "Thank you",
    };
    sendMail(mailData);
    res.status(200).json({
      status: "succeess",
      message: "successfully verify email",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
    });
  }
};
