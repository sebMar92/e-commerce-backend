const { User } = require("../../database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authLogin = async (email, password) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user == null) {
    return { error: "email doesn't match any existing user." };
  }
  if (await bcrypt.compare(password, user.password)) {
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
    return { msg: "logged in", accessToken: accessToken };
  } else {
    return { error: "the password is incorrect." };
  }
};

module.exports = authLogin;
