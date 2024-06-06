const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (id) => {
  return {
    accessToken:jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    }),
    refreshToken:jwt.sign({ id }, process.env.REFRESH_JWT_SECRET, {
      expiresIn: "5m",
    })
  }
};

module.exports = generateToken;
