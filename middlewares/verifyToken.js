const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in",
      });
    }
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SIGNATURE
    );
    req.user = decoded;
    next();
  } catch (error) {
    {
      res.status(403).json({
        status: "fail",
        message : "your login session expired please login again",
        errormessage : "your login session expired please login again"
      });
    }
  }
};
