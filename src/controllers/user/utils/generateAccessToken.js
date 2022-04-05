const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (user) => {
  try {
    const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    return token;
  } catch(err){
    console.log(err);
  }
};

module.exports = generateAccessToken;
