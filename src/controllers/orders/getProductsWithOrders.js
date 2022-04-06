const { Order, Product, Image, Sale, Category } = require('../../database.js');

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
        {
          model: Sale,
          attributes: ['percentage', 'day', 'productAmount', 'id'],
          through: {
            attributes: [],
          },
        },
        {
          model: Category,
          as: 'categories',
          attributes: ['name', 'id'],
          through: {
            attributes: [],
          },
          include: [
            {
              model: Sale,
              attributes: ['percentage', 'day', 'productAmount', 'id'],
              through: {
                attributes: [],
              },
            },
          ],
        },
      ],
    });
    if (inCartProducts.length > 0) {
      return inCartProducts;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = getProductsWithOrders;
