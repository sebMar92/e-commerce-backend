const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const orderCompose = async (direction) => {
  var orderStatement = { order: [["id", "ASC"]] };
  if (direction) {
    orderStatement.order = [["price", direction]];
  }

  return orderStatement;
};

module.exports = orderCompose;
