const Sequelize = require("sequelize");
const { Product, Category } = require("../../../database.js");

const Op = Sequelize.Op;

const countPages = async (
  itemsPerPage,
  whereStatement,
  categoryWhereStatement
) => {
  console.log("count ", whereStatement, categoryWhereStatement);
  const products = await Product.findAll({
    ...whereStatement,
    include: [
      {
        model: Category,
        as: "categories",
        attributes: ["name", "id"],
        ...categoryWhereStatement,
        through: {
          attributes: [],
        },
      },
    ],
  });
  const amountOfProducts = products.length;
  console.log(amountOfProducts);
  if (!itemsPerPage) {
    itemsPerPage = 16;
  }

  return Math.ceil(amountOfProducts / itemsPerPage);
};

module.exports = countPages;
