const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const orderCompose = async (direction) => {
  var orderStatement = { order: [] };
  if (direction) {
    orderStatement.order = [["price", direction]];
  }

  return orderStatement;
};

module.exports = orderCompose;
