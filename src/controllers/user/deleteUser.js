const { User } = require("../../database.js");

const deleteUser = async (id, userId) => {
  try {
    console.log(id, userId);
    const user = await User.findOne({
      where: { id: id, userId: userId },
    });
    if (user) {
      await User.destroy({ where: { id: id, userId: userId } });
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = deleteUser;
