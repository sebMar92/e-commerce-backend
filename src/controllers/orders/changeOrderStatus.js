const { Order } = require("../../database.js");

const changeOrderStatus = async (orderId, status) => {
  const order = await Order.findOne({ where: { id: orderId } });
  if (
    order &&
    order.status !== status &&
    (status === "inWishList" ||
      status === "inCart" ||
      status === "pending" ||
      status === "finished")
  ) {
    const orderWithThatStatus = await Order.findOne({
      where: { userId: order.userId, productId: order.productId, status: status },
    });
    if (orderWithThatStatus) {
      orderWithThatStatus.amount = orderWithThatStatus.amount + order.amount;
      await orderWithThatStatus.save();
      await Order.destroy({ where: { id: order.id } });
      return true;
    }
    order.status = status;
    await order.save();
    return true;
  }
  return false;
};

module.exports = changeOrderStatus;
