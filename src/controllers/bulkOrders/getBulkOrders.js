const { Order, Product, Image, Bulkorder } = require('../../database.js');

const getBulkOrders = async (user, status) => {
  const inStatusProducts = await Product.findAll({
    attributes: ['title', 'id', 'price', 'shippingCost', 'stock', 'description'],
    include: [
      {
        model: Order,
        where: { userId: user.id, status: status },
        as: 'orders',
      },
      {
        model: Image,
        as: 'images',
        attributes: ['url', 'altText'],
      },
    ],
  });
  const simpleProducts = inStatusProducts.map((product) => product.toJSON());
  const inStatusBulks = await Bulkorder.findAll({ where: { status: status } });
  if (inStatusBulks.length > 0) {
    const bulksWithProducts = await Promise.all(
      inStatusBulks.map(async (bulk) => {
        bulk = bulk.toJSON();
        bulk.products = [];
        const ordersInBulk = await Order.findAll({ where: { bulkorderId: bulk.id } });
        for await (const order of ordersInBulk) {
          const foundProduct = simpleProducts.find(
            (product) => product.id === order.productId
          );

          let productWithOneOrder = foundProduct;
          productWithOneOrder.orders = productWithOneOrder.orders.filter(
            (ord) => ord.id == order.id
          );
          bulk.products.push(productWithOneOrder);
        }
        return await bulk;
      })
    );
    const mappedProducts = simpleProducts.filter((product) => {
      product.orders = product.orders.filter((ord) => {
        if (!ord.bulkorderId) {
          return ord;
        }
      });
      if (product.orders.length > 0) {
        return product;
      }
    });
    return [...mappedProducts, ...bulksWithProducts];
  }
  return false;
};

module.exports = getBulkOrders;
