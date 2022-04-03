const { Order, Product } = require('../../database.js');
const createOrder = require('./createOrder.js');

const changeOrderStatus = async (orderId, status, user, date) => {
  try {
    const order = await Order.findOne({ where: { id: orderId } });
    if (
      order &&
      (status === 'inWishList' ||
        status === 'inCart' ||
        status === 'pending' ||
        status === 'finished' ||
        status === 'preparing' ||
        status === 'onDelivery' ||
        status === 'delivered' ||
        status === 'cancelled')
    ) {
      /////viene desde pending en adelante
      if (status === 'finished') {
        const productToBuy = await Product.findOne({ where: { id: order.productId } });
        if (productToBuy && productToBuy.stock < order.amount) {
          return { error: "There's not enough stock." };
        } else {
          productToBuy.stock = productToBuy.stock - order.amount;
          productToBuy.save();
          order.serverPurchaseDate = Date();
          order.localPurchaseDate = date;
          order.status = status;
          await order.save();
          return true;
        }
      }
      if (status === 'delivered') {
        order.serverDeliverDate = Date();
        order.localDeliverDate = date;
        order.status = status;
        await order.save();
        return true;
      }
      if (status === 'cancelled') {
        order.serverCancelDate = Date();
        order.localCancelDate = date;
        order.status = status;
        await order.save();
        return true;
      }
      ////previo a pending. Si la orden actual es wishlist no la borra.
      if (order.status === 'inWishList') {
        await createOrder(status, 1, user, order.productId);
        return true;
      }
      ////solamente de pending a inCart para la eventualidad de que ya exista en cart nuevamente
      if (status === 'inCart') {
        if (user) {
          const orderWithThatStatus = await Order.findOne({
            where: { userId: order.userId, productId: order.productId, status: status },
          });
          if (orderWithThatStatus) {
            orderWithThatStatus.amount = orderWithThatStatus.amount + order.amount;
            await orderWithThatStatus.save();
            await Order.destroy({ where: { id: order.id } });
            return true;
          }
        }
      }
      ///inCart a pending, finish a preparing, onDelivery

      order.status = status;
      await order.save();
      return true;
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = changeOrderStatus;
