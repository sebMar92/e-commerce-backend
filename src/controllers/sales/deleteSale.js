const { Sale } = require("../../database.js");

const deleteSale = async (saleId) => {
  const sale = await Sale.findOne({ where: { id: saleId } });
  if (sale) {
    await Sale.destroy({
      where: {
        id: saleId,
      },
    });
    return true;
  }
  return false;
};

module.exports = deleteSale;
