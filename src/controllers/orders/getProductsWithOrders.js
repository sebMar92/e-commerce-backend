const { Order, Product, Image, Sale, Category } = require('../../database.js');
const Sequelize = require('sequelize')
const Op = Sequelize.Op


const getProductsWithOrders = async (user, status) => {
  try {
    let whereStatement = {where:{userId: user.id}}
    if(status.includes(",")){
      whereStatement.where.status = {[Op.or] : status.split(",")}
    }else{
      whereStatement.where.status = status
    }
    const inCartProducts = await Product.findAll({
      attributes: ['title', 'id', 'price', 'shippingCost', 'stock', 'description'],
      include: [
        {
          model: Order,
          ...whereStatement,
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
