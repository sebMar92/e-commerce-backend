const { Order } = require('../../database.js');

const deleteOrder = async (orderId) => {
  try {
    const order = await Order.findOne({ where: { id: orderId } });
    if (order) {
      await Order.destroy({
        where: {
          id: orderId,
        },
      });
      return true;
    }
  }catch(err){
    console.log(err);
    return false;
  }
};

module.exports = deleteOrder;
