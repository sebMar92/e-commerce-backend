const { Product } = require('../../database.js');
const createAndAddImages = require('../images/createAndAddImages.js');
const createAndAddCategories = require('../category/createAndAddCategory.js');

const createProduct = async (data) => {
  const { title, name, price, shippingCost, stock, description, images, categories } =
    data;
  const newProduct = await Product.create({
    title,
    name,
    price,
    shippingCost,
    stock,
    description,
  });
  await createAndAddImages(images, newProduct);
  await createAndAddCategories(categories, newProduct);
  return newProduct;
};

module.exports = createProduct;
