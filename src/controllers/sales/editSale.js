const createAndAddSale = require('./createAndAddSale.js');
const deleteSale = require('./deleteSale.js');

const editSale = async (salesData) => {
  try {
    await deleteSale(salesData.id);
    await createAndAddSale(salesData);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = editSale;
