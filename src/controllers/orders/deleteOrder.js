const { Order } = require("../../database.js");

const deleteOrder = async (orderId) => {
  const order = await Order.findOne({ where: { id: orderId } });
  if (order) {
    await Order.destroy({
      where: {
        id: orderId,
      },
    });
    return true;
  }
  return false;
};

module.exports = deleteOrder;
