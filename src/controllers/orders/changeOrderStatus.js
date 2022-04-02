const { Order, Product } = require('../../database.js');
const createOrder = require('./createOrder.js');

const changeOrderStatus = async (orderId, status, user) => {
  const order = await Order.findOne({ where: { id: orderId } });

  if (
    order &&
    order.status !== status &&
    (status === 'inWishList' ||
      status === 'inCart' ||
      status === 'pending' ||
      status === 'finished')
  ) {
    if (status === 'finished') {
      const productToBuy = await Product.findOne({ where: { id: order.productId } });
      if (productToBuy && productToBuy.stock < order.amount) {
        return { error: "There's not enough stock." };
      } else {
        productToBuy.stock = productToBuy.stock - order.amount;
        productToBuy.save();
      }
    }
    const orderWithThatStatus = await Order.findOne({
      where: { userId: order.userId, productId: order.productId, status: status },
    });
    if (orderWithThatStatus) {
      orderWithThatStatus.amount = orderWithThatStatus.amount + order.amount;
      await orderWithThatStatus.save();
      await Order.destroy({ where: { id: order.id } });
      return true;
    }
    if (order.status === 'inWishList') {
      await createOrder(status, 1, user, order.productId);
      return true;
    }
    order.status = status;
    await order.save();
    return true;
  }
  return false;
};

module.exports = changeOrderStatus;
