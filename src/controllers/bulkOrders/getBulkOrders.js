const { Order, Product, Image, Bulkorder } = require('../../database.js');
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
const getBulkOrders = async (user, status) => {
  try {
    var whereStatement = {
      where: {
        status: {
          [Op.or]: ['pending', 'finished', 'preparing', 'onDelivery'],
        },
        userId: user.id,
      },
    };
    if (status) {
      whereStatement.where.status = status;
    }

    const inStatusProducts = await Product.findAll({
      attributes: ['title', 'id', 'price', 'shippingCost', 'stock', 'description'],
      include: [
        {
          model: Order,
          ...whereStatement,
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

    const inStatusBulks = await Bulkorder.findAll({
      ...whereStatement,
    });
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
            productWithOneOrder.orders = productWithOneOrder.orders.filter((ord) => {
              if (ord.id == order.id) return ord;
            });
            await bulk.products.push(productWithOneOrder);
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
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = getBulkOrders;
