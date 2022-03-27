const { Order, Product, Image } = require("../../database.js");


const getProductsWithOrders = async (user, status) => {
  const inCartProducts = await Product.findAll({
    attributes: ["title", "id", "price", "shippingCost", "stock", "description"],
    include: [
      {
        model: Order,
        where: { userId: user.id, status: status },
        as: "orders",
        attributes: ["id", "amount"],
      },
      {
        model: Image,
        as: "images",
        attributes: ["url", "altText"],
      },
    ],
  });
  if (inCartProducts.length > 0) {
    return inCartProducts;
  }

  return false;
};

module.exports = getProductsWithOrders;
