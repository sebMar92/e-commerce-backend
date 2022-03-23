const { Direction } = require("../../database.js");

const deleteDirection = async (id) => {
  try {
    const direction = await Direction.findOne({
      where: { id: id },
    });
    if (direction) {
      await Direction.destroy({ where: { id: id } });
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = deleteDirection;
