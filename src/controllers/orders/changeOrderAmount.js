const { Order } = require("../../database.js");

const changeOrderAmount = async (orderId, amount) => {
  const order = await Order.findOne({ where: { id: orderId } });
  if (order) {
    if (order.amount + amount > 1) {
      await Order.destroy({ where: { id: orderId } });

      return true;
    }
    order.amount = order.amount + amount;
    await order.save();

    return true;
  }

  return false;
};

module.exports = changeOrderAmount;
