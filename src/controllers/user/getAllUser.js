const { User, Direction } = require("../../database.js");

const getAllUser = async () => {
  try {
    const users = await User.findAll();
    if (users) {
      let arr = [];
      for (let i = 0; i < users.length; i++) {
        let simpleUser = users[i].toJSON();
        let directions = await Direction.findAll({
          where: { userId: users[i].id },
          attributes: [
            "id",
            "city",
            "postalCode",
            "street",
            "streetNumber",
            "floor",
            "unit",
          ],
        });
        simpleUser.directions = directions;
        arr.push(simpleUser);
      }
      return arr;
    } else {
      return { error: "users don't exist" };
    }
  } catch (err) {
    console.log(err);
    return { error: "users don't exist" };
  }
};
module.exports = getAllUser;
