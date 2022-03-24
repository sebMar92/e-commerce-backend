const { Direction } = require("../../database.js");

const deleteDirection = async (id, userId) => {
  try {
    const direction = await Direction.findOne({
      where: { id: id, userId: userId },
    });
    if (direction) {
      await Direction.destroy({ where: { id: id, userId: userId } });
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = deleteDirection;
