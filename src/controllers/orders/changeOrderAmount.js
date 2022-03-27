const { Order } = require("../../database.js");

const changeOrderAmount = async (orderId, amount) => {
  console.log("llega")
  console.log(orderId+ "orderId")
  console.log(amount+"cantidad")
  console.log(Order)
  const order = await Order.findOne({ where: { id: orderId } });
  console.log(order)
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
