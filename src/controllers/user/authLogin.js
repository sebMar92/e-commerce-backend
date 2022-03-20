const { User } = require("../../database.js");
const bcrypt = require("bcrypt");

const generateAccessToken = require("./utils/generateAccessToken.js");
const generateRefreshToken = require("./utils/generateRefreshToken.js");
require("dotenv").config();

const authLogin = async (email, password) => {
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user == null) {
      return { error: "email doesn't match any existing user." };
    }
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = await generateAccessToken(user);
      const refreshToken = await generateRefreshToken(user);

      return { msg: "logged in", accessToken: accessToken, refreshToken: refreshToken };
    } else {
      return { error: "the password is incorrect." };
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = authLogin;
