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
      attributes: ["title", "id", "price", "shippingCost", "description", "stock"],
      include: [
        {
          model: Sale,
          attributes: ["percentage", "day", "productAmount", "id"],
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
              attributes: ["percentage", "day", "productAmount", "id"],
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
        category.sales.categoryId = category.id;
        categorySales.push(...category.sales);
        delete category.sales;
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
