const jwt = require("jsonwebtoken");
const config = require("./../config");

module.exports = function(req, res, next) {
  let token;
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
  }

  if (req.headers["token"]) {
    token = req.headers["token"];
  }

  if (!token) {
    return next({
      msg: "You dont have token..."
    });
  }

  jwt.verify(token, config.jwtSecret, function(err, decoded) {
    if (err) {
      return next(err);
    }

    req.user = decoded;
    // console.log(req.user);
    return next();
  });
};
