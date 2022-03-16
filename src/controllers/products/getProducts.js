const res = require("express/lib/response");
const { Product, Image, Category } = require("../../database.js");

const getProducts = async () => {
  try {
    const products = await Product.findAll({
      attributes: [
        "name",
        "id",
        "price",
        "shippingCost",
        "stock",
        "description",
      ],
      include: [
        {
          model: Image,
          as: "images",
          attributes: ["url", "altText"],
        },
        {
          model: Category,
          as: "categories",
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });
    const editableProducts = products.map((product) => product.toJSON());
    const productsWithSimpleCategories = editableProducts.map((product) => {
      const categoryName = product.categories.map((category) => category.name);
      return { ...product, categories: categoryName };
    });
    return productsWithSimpleCategories;
  } catch (err) {
    console.log(err);
  }
};

module.exports = getProducts;
