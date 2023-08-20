const admin = require("../firebase/firebase-config");

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(401).json({
      status: "fail",
      message: "hey hacker just go waya",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      if (decodedToken) {
        return next();
      } else {
        res.status(401).json({
          status: "fail",
          message: "hey hacker just go waya",
        });
      }
    })
    .catch((error) => {
      res.status(401).json({
        status: "fail",
        message: "hey hacker just go waya",
      });
    });
};
