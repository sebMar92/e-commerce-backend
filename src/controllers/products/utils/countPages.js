const Sequelize = require("sequelize");
const { Product } = require("../../../database.js");

const Op = Sequelize.Op;

const countPages = async (itemsPerPage) => {
  const amountOfProducts = await Product.count({
    where: { stock: { [Op.gt]: 0 } },
  });
  if (!itemsPerPage) {
    itemsPerPage = 16;
  }

  return Math.ceil(amountOfProducts / itemsPerPage);
};

module.exports = countPages;
