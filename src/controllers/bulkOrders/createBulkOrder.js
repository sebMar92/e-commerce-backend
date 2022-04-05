const { Order, Bulkorder, Product, User } = require('../../database.js');
const changeOrderStatus = require('../orders/changeOrderStatus.js');

const createBulkOrder = async (data) => {
  try {
    const { orderIds, user } = data;
    if (orderIds) {
      const newBulk = await Bulkorder.create({ status: 'pending' });
      let fullPrice = 0;
      let fullShipping = 0;
      for (const order of orderIds) {
        const statusChange = await changeOrderStatus(order, 'pending', user);
        if (!statusChange) {
          await Bulkorder.destroy({ where: { id: newBulk.id } });
          return false;
        } else {
          const foundOrder = await Order.findOne({ where: { id: order } });
          await newBulk.addOrder(foundOrder);
          const foundProduct = await Product.findOne({
            where: { id: foundOrder.productId },
          });
          fullPrice = fullPrice + foundOrder.amount * foundProduct.price;
          fullShipping = fullShipping + foundProduct.shippingCost;
        }
      }
      newBulk.combinedPrice = fullPrice;
      newBulk.combinedShippingCost = fullShipping;
      const foundUser = await User.findOne({ where: { id: user.id } });
      await foundUser.addBulkorder(newBulk);
      await newBulk.save();
      return newBulk;
    }
  } catch (err) {
    console.log("Error",err);
    return false;
  }
};

module.exports = createBulkOrder;
