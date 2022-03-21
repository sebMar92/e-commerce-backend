const { User } = require("../../../database.js");

const verifyEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    return { msg: "email exists" };
  } else {
    return { msg: "email doesn't exist" };
  }
};

module.exports = verifyEmail;
