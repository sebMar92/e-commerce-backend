const { Order, Bulkorder } = require('../../database.js');

const deleteBulkOrder = async (bulkorderId) => {
  const bulkorder = await Bulkorder.findOne({ where: { id: bulkorderId } });
  if (bulkorder) {
    await Order.destroy({ where: { bulkorderId: bulkorderId } });
    await Bulkorder.destroy({ where: { id: bulkorderId } });
    return true;
  }
  return false;
};

module.exports = deleteBulkOrder;
