const { User } = require("../../database.js");
const bcrypt = require("bcrypt");
const createAndAddDirection = require("../direction/createAndAddDirection.js");

const createUser = async (data) => {
  const {
    firstName,
    lastName,
    password,
    profilePicture,
    email,
    rol,
    newsletterSubscription,
    direction,
  } = data;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    firstName: firstName,
    lastName: lastName,
    password: hashedPassword,
    profilePicture: profilePicture,
    email: email,
    rol: rol,
    newsletterSubscription: newsletterSubscription,
  });
  await createAndAddDirection(direction, newUser);
};

module.exports = createUser;
