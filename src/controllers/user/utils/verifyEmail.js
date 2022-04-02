const { User } = require('../../../database.js');

const verifyEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    if (user.googleUser) {
      return { msg: 'email exists', googleUser: true };
    } else {
      return { msg: 'email exists', googleUser: false };
    }
  } else {
    return { msg: "email doesn't exist" };
  }
};

module.exports = verifyEmail;
