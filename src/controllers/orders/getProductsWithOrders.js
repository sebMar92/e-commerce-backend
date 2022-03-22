const { Order, Product } = require("../../database.js");

const getProductsInCart = async (user) => {
  const inCartProducts = await Product.findAll({
    attributes: ["title", "id", "price", "shippingCost", "stock"],
    include: [
      {
        model: Order,
        where: { userId: user.id, status: "inCart" },
        as: "orders",
        attributes: ["id", "amount"],
      },
    ],
  });
  if (inCartProducts.length > 0) {
    return inCartProducts;
  }

  return false;
};

module.exports = getProductsInCart;
