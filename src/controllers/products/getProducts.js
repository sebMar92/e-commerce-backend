const { Product, Image, Category, Sale } = require("../../database.js");

const getProducts = async (
  orderDisposition,
  paginationSettings,
  whereStatement,
  categoryWhereStatement
) => {
  try {
    const products = await Product.findAll({
      ...whereStatement,
      ...orderDisposition,
      ...paginationSettings,
      attributes: ["title", "id", "price", "shippingCost"],
      include: [
        {
          model: Sale,
          attributes: ["percentage", "day", "productAmount"],
          through: {
            attributes: [],
          },
        },
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
          include: [
            {
              model: Sale,
              attributes: ["percentage", "day", "productAmount"],
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });

    const productsWithSales = products.map((product) => {
      product = product.toJSON();
      let productSales = [...product.sales];
      product.sales = { productSales: productSales };
      let categorySales = [];
      for (let category of product.categories) {
        if (category.hasOwnProperty("sales")) {
          category.sales.categoryId = category.id;
          categorySales.push(...category.sales);
          delete category.sales;
        }
      }
      product.sales.categorySales = categorySales.flat();
      return product;
    });

    return productsWithSales;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getProducts;
