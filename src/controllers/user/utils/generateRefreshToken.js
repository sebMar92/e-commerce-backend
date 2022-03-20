const jwt = require("jsonwebtoken");
const { Token } = require("../../../database.js");
require("dotenv").config();

const generateRefreshToken = async (user) => {
  const newRefreshToken = jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET);
  await Token.create({
    token: newRefreshToken,
  });
  return newRefreshToken;
};

module.exports = generateRefreshToken;
