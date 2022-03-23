const { User } = require("../../database.js");

const deleteUser = async (id) => {
  try {
    const user = await User.findOne({
      where: { id: id },
    });
    if (user) {
      await User.destroy({ where: { id: id } });
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = deleteUser;
