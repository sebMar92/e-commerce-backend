const { Order } = require("../../database.js");

const changeOrderStatus = async (orderId, status) => {
  const order = await Order.findOne({ where: { id: orderId } });
  if (
    order &&
    (status === "inWishList" ||
      status === "inCart" ||
      status === "pending" ||
      status === "finished")
  ) {
    order.status = status;
    await order.save();
    return true;
  }
  return false;
};

module.exports = changeOrderStatus;
