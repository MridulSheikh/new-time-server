const {
  createUserService,
  getUserService,
  getUserByIdService,
  userUpdatebyIdService,
} = require("../services/user.sevices");

const { sendMail } = require("../lib/email");
const { generateToken } = require("../utils/token");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

exports.createUserController = async (req, res) => {
  try {
    const filter = await getUserByIdService(req.body.email);
    if (filter === null) {
      const result = await createUserService(req.body.email);
      if (result.email) {
        const token = generateToken({ email: result.email, role: "buyer" }, '24h');
        res.status(200).json({
          status: "success",
          message: "successfully create user",
          body: { ...result, token: token },
        });
        return;
      }
    } else {
      const token = generateToken(filter, '24h');
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
     const token = generateToken({ email: req.params.email},'120s');
     const confirm_uri = `${process.env.CLIENT_HOST}/verifyemail/${token}`
     const mailData = {
      forom : process.env.SENDER_MAIL,
      to: [req.params.email],
      subject: "Time keeper - verify your email",
      template : 'email',
      context: {
        email : req.params.email,
        confirm_uri : confirm_uri
    }
    };
   const infoMessageId = await sendMail(mailData);
    res.status(200).json({
      status: "succeess",
      message: "Please check you email",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
      message: "email not send",
    });
  }
};

exports.emailConfirm = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SIGNATURE
    );
    if(decoded?.email){
      const userupdate = await userUpdatebyIdService(decoded.email, {verified : true})
      console.log(userupdate)
      if(userupdate.modifiedCount === 0){
        res.status(500).json({
          status: "fail",
          message: "email is not verified please try again",
        })
        return;
      }
      res.status(200).json({
        status: "success",
        message: "email sucessfully verified",
      })
    }else{ 
      res.status(500).json({
        status: "fail",
        message: "email is not verified please try again",
      })
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
      message : "email not varified please try again"
    });
  }
};