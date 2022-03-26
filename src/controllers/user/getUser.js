const { User, Direction } = require("../../database.js");

const getUser = async (id) => {
  try {
    const user = await User.findOne({
      where: { id: id },
    });
    const directions = await Direction.findAll({
      where: { userId: id },
      attributes: ["id", "city", "postalCode", "street", "streetNumber", "floor", "unit"],
    });
    if(user){
    const simpleUser = user.toJSON();
    simpleUser.directions = directions;
    return simpleUser
  }else{
      return {error: "user doesn't exist"}
    }
  } catch (err) {
    console.log(err);
    return { error: "user doesn't exist" };
  }
};
module.exports = getUser;
