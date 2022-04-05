const { Product } = require('../../database.js');

const deleteProducts = async (id) => {
  try {
    const product = await Product.findOne({
      where: { id: id },
    });
    if (product) {
      await Product.destroy({ where: { id: id } });
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
module.exports = deleteProducts;
