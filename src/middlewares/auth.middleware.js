const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const UserModel = require("../app/auth/user.model");

const checkAuthentication = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      //error log,  JsonWebTokenError: invalid signature
      next(error);
    }
  }

  if (!token) {
    next({code:401, message:"no token provided"});
  }
};
module.exports = checkAuthentication;
