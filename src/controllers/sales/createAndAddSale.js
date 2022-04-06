const { Sale } = require('../../database.js');

const createAndAddSale = async (salesData) => {
  try {
    const { description, percentage, day, productAmount, category, product, image, id } =
      salesData;
    const newSale = await Sale.create({
      description,
      percentage,
      day,
      productAmount,
      image,
      id,
    });
    if (Array.isArray(category)) {
      for await (cat of category) {
        await newSale.addCategory(cat.id);
      }
    }
    if (Array.isArray(product)) {
      for (prod of product) {
        await newSale.addProduct(prod.id);
      }
    }
    if (category === 0 && product === 0) {
      newSale.global = true;
      await newSale.save();
    }
    if (category > 0) {
      await newSale.addCategory(category);
    }
    if (product > 0) {
      await newSale.addProduct(product);
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = createAndAddSale;
