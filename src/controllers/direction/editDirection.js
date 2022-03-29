const { Direction } = require('../../database.js');

const editDirection = async (data) => {
  try {
    const { city, postalCode, street, streetNumber, floor, unit, id } = data;
    const foundDirection = await Direction.findOne({ where: { id: id } });
    if (foundDirection) {
      foundDirection.city = city;
      foundDirection.postalCode = postalCode;
      foundDirection.street = street;
      foundDirection.streetNumber = streetNumber;
      foundDirection.floor = floor;
      foundDirection.unit = unit;
      foundDirection.save();
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = editDirection;
