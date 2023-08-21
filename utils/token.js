const jwt = require("jsonwebtoken");
exports.generateToken = (userInfo, expiredate) => {
  const payload = {
    email: userInfo.email,
    role: userInfo.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SIGNATURE, {
    expiresIn: expiredate,
  });
  return token;
};
