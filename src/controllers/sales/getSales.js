const { Sale, Product, Category, Image } = require('../../database.js');

const getSales = async () => {
  try {
    const sales = await Sale.findAll({
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: ['name', 'id', 'image'],
          through: {
            attributes: [],
          },
        },
        {
          model: Product,
          as: 'products',
          attributes: ['title', 'name', 'id', 'price', 'shippingCost', 'description'],
          include: [
            {
              model: Image,
              as: 'images',
              attributes: ['url', 'altText'],
            },
          ],
          through: {
            attributes: [],
          },
        },
      ],
    });
    if (sales) {
      return sales;
    } else {
      return { error: 'no sales found' };
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = getSales;
