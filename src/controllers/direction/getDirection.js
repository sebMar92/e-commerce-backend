const { Direction } = require('../../database.js');

const getDirection = async (userId) => {
  try {
    const direction = await Direction.findOne({
      where: { userId: userId },
    });
    if (direction) {
      return direction;
    } else {
      return { error: 'no direction found' };
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = getDirection;
