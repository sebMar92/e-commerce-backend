const { Order } = require('../../database.js');

const changeOrderAmount = async (orderId, amount) => {
  try {
    const order = await Order.findOne({ where: { id: orderId } });
    if (order) {
      if (Number(order.amount) + Number(amount) < 1) {
        await Order.destroy({ where: { id: orderId } });
  
        return true;
      }
      order.amount = Number(order.amount) + Number(amount);
      await order.save();
  
      return true;
    }
  } catch(err){
    console.log(err);
    return false;
  }
};

module.exports = changeOrderAmount;
