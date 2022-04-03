const { Order, Bulkorder } = require('../../database.js');
const changeOrderStatus = require('../orders/changeOrderStatus.js');

const changeBulkOrderStatus = async (data) => {
  const { bulkId, status, date, purchaseId } = data;
  try {
    const foundBulk = await Bulkorder.findOne({ where: { id: bulkId } });
    const serverDate = Date();
    foundBulk.status = status;
    if (status === 'finished') {
      foundBulk.purchaseId = purchaseId;
      foundBulk.localPurchaseDate = date;
      foundBulk.serverPurchaseDate = serverDate;
    }
    if (status === 'delivered') {
      foundBulk.localDeliverDate = date;
      foundBulk.serverDeliverDate = serverDate;
    }
    if (status === 'cancelled') {
      foundBulk.localCancelDate = date;
      foundBulk.serverCancelDate = serverDate;
    }
    await foundBulk.save();

    const ordersInBulk = await Order.findAll({ where: { bulkorderId: bulkId } });
    for (const order of ordersInBulk) {
      const changed = await changeOrderStatus(order.id, status, null, date);
      if (!changed) {
        return false;
      }
    }
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = changeBulkOrderStatus;
