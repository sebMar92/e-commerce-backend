const { Direction, User } = require('../../database.js');

const createAndAddDirection = async (direction, user) => {
  try {
    const { city, postalCode, street, streetNumber, floor, unit } = direction;
    const foundUser = await User.findOne({ where: { id: user.id } })
    const newDirection = await Direction.create({
      city: city,
      postalCode: postalCode,
      street: street,
      streetNumber: streetNumber,
      floor: floor,
      unit: unit,
    });
    await foundUser.addDirection(newDirection);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = createAndAddDirection;
