const { Sale } = require("../../database.js");

const deleteSale = async (saleId) => {
  try {
    const sale = await Sale.findOne({ where: { id: saleId } });
    if (sale) {
      await Sale.destroy({
        where: {
          id: saleId,
        },
      });
      return true;
    }
  } catch(err){
    console.log(err);
    return false;
  }
};

module.exports = deleteSale;
