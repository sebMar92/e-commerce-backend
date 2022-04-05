const { Order, Bulkorder } = require('../../database.js');

const deleteBulkOrder = async (bulkorderId) => {
  try {
    const bulkorder = await Bulkorder.findOne({ where: { id: bulkorderId } });
    if (bulkorder) {
      await Order.destroy({ where: { bulkorderId: bulkorderId } });
      await Bulkorder.destroy({ where: { id: bulkorderId } });
      return true;
    }
  } catch(err){
    console.log(err);
    return false;
  }
};

module.exports = deleteBulkOrder;
