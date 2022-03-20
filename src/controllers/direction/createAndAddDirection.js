const { Direction, User } = require("../../database.js");

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
    user.addDirection(newDirection);
  } catch (err) {
    console.log(err);
  }
};

module.exports = createAndAddDirection;
