const jwt = require("jsonwebtoken");
const errorHandler= require("./error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_Token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(errorHandler(401, "Unauthorized1"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized2"));
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
