const Sequelize = require("sequelize");
const { Product, Category } = require("../../../database.js");

const Op = Sequelize.Op;

const countPages = async (itemsPerPage, whereStatement, categoryWhereStatement) => {
  try {
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
    if (!itemsPerPage) {
      itemsPerPage = 16;
    }
  
    return Math.ceil(amountOfProducts / itemsPerPage);
  } catch(err){
    console.log(err);
  }
};

module.exports = countPages;
