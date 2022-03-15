const { Product } = require("../../database.js");
const createAndAddImages = require("../images/createAndAddImages.js");
const createAndAddCategories = require("../category/createAndAddCategory.js");

const createProduct = async (data) => {
  const { name, price, shippingCost, stock, description, images, categories } =
    data;
  const newProduct = await Product.create({
    name,
    price,
    shippingCost,
    stock,
    description,
  });
  createAndAddImages(images, newProduct);
  createAndAddCategories(categories, newProduct);
};

module.exports = createProduct;
