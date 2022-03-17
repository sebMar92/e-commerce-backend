const { Product, Image, Category } = require("../../database.js");

const getProducts = async (
  orderDisposition,
  whereStatement,
  categoryWhereStatement
) => {
  try {
    const products = await Product.findAll({
      ...whereStatement,
      ...orderDisposition,
      include: [
        {
          model: Image,
          as: "images",
          attributes: ["url", "altText"],
        },
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
    return products;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getProducts;
