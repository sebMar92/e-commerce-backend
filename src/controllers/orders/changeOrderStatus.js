const { Order } = require("../../database.js");

const changeOrderStatus = async (orderId) => {
  const order = await Order.findOne({ where: { id: orderId } });
  const status= order.dataValues.status;
  
  if (
    order &&
     /* order.dataValues.status !== status &&  */
    (status === "inWishList" ||
      status === "inCart" ||
      status === "pending" ||
      status === "finished")
  ) {
    const orderWithThatStatus = await Order.findOne({
      where: { userId: order.dataValues.userId, productId: order.dataValues.productId, status: status },
    });
    
    if (orderWithThatStatus) {
      orderWithThatStatus.amount = orderWithThatStatus.amount + order.dataValues.amount;
      await orderWithThatStatus.save();
      await Order.destroy({ where: { id: order.dataValues.id } });
      
      return true;
    }
    order.status = status;
    await order.save();
    return true;
  }
  return false;
};

module.exports = changeOrderStatus;
