const { Direction, User } = require('../../database.js');

const createAndAddDirection = async (direction, user) => {
  try {
    const { city, postalCode, street, streetNumber, floor, unit } = direction;
    const newDirection = await Direction.create({
      city: city,
      postalCode: postalCode,
      street: street,
      streetNumber: streetNumber,
      floor: floor,
      unit: unit,
    });
    await user.addDirection(newDirection);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = createAndAddDirection;
