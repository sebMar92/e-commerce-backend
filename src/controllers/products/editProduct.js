const { Product } = require('../../database.js');
const createAndAddImages = require('../images/createAndAddImages.js');
const createAndAddCategories = require('../category/createAndAddCategory.js');

const editProduct = async (data, id) => {
  const { title, name, price, shippingCost, stock, description, images, categories } =
    data;

  const foundProduct = Product.find({ where: { id: id } });

  if (foundProduct) {
    foundProduct.toJSON();

    foundProduct.title = title;
    foundProduct.name = name;
    foundProduct.price = price;
    foundProduct.shippingCost = shippingCost;
    foundProduct.stock = stock;
    foundProduct.description = description;
    foundProduct.save();
  }

  await foundProduct.removeCategories();
  await foundProduct.removeImages();
  await createAndAddImages(images, foundProduct);
  await createAndAddCategories(categories, foundProduct);
  return foundProduct;
};

module.exports = editProduct;

