const { Order, Product, Image } = require('../../database.js');

const getProductsWithOrders = async (user, status) => {
  try {
    const inCartProducts = await Product.findAll({
      attributes: ['title', 'id', 'price', 'shippingCost', 'stock', 'description'],
      include: [
        {
          model: Order,
          where: { userId: user.id, status: status },
          as: 'orders',
          attributes: [
            'id',
            'amount',
            'localPurchaseDate',
            'localDeliverDate',
            'localCancelDate',
          ],
        },
        {
          model: Image,
          as: 'images',
          attributes: ['url', 'altText'],
        },
      ],
    });
    if (inCartProducts.length > 0) {
      return inCartProducts;
    }
  } catch(err){
    console.log(err);
    return false;
  }
};

module.exports = getProductsWithOrders;
