const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (user) => {
  const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
  return token;
};

module.exports = generateAccessToken;
