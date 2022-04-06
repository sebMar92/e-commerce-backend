const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const orderCompose = async (direction) => {
  try {
    var orderStatement = { order: [["id", "ASC"]] };
    if (direction) {
      orderStatement.order = [["price", direction]];
    }
  
    return orderStatement;
  } catch(err){
    console.log(err);
  }
};

module.exports = orderCompose;
