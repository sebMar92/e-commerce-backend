const { Sale } = require("../../database.js");

const createAndAddSale = async (salesData) => {
  try {
    const { description, percentage, day, productAmount, category, product } = salesData;
    const newSale = await Sale.create({
      description,
      percentage,
      day,
      productAmount,
    });
    if (category === 0 && product === 0) {
      newSale.global = true;
      newSale.save();
    }
    if (category > 0) {
      newSale.addCategory(category);
    }
    if (product > 0) {
      newSale.addProduct(product);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = createAndAddSale;
