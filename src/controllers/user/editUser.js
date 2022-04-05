const { User, Direction } = require("../../database.js");
const bcrypt = require("bcrypt");
const editDirection = require("../direction/editDirection.js");

const editUser = async (data, id) => {
  const {
    firstName,
    lastName,
    prevPassword,
    newPassword,
    profilePicture,
    email,
    newsletterSubscription,
    direction,
    rol
  } = data;
  try {
    const foundUser = await User.findOne({
      where: {
        id: id,
      },
    });
    if (foundUser) {
      if (prevPassword && newPassword) {
        var hashedPassword = await bcrypt.hash(newPassword, 10);
      } else if (newPassword) {
        return { error: "prevPassword needed to change password" };
      }
      if (firstName) foundUser.firstName = firstName;
      if (lastName) foundUser.lastName = lastName;
      if (rol) foundUser.rol = rol;
      if (hashedPassword) foundUser.password = hashedPassword;
      if (profilePicture) foundUser.profilePicture = profilePicture;
      if (email) foundUser.email = email;
      if (newsletterSubscription === true || newsletterSubscription === false) {
        foundUser.newsletterSubscription = newsletterSubscription;
      }
      foundUser.save();
      if (direction) {
        const didEditDirection = await editDirection(direction);
        if (!didEditDirection) {
          return { error: "couldn't change direction" };
        }
      }
      return { msg: "user information updated" };
    }
  } catch (err) {
    console.log(err);
    return { error: "something went wrong" };
  }
};

module.exports = editUser;
