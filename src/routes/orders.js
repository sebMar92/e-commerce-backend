const router = require("express").Router();
const createOrder = require("../controllers/orders/createOrder.js");
const getProductsWithOrders = require("../controllers/orders/getProductsWithOrders.js");
const authToken = require("./middlewares/authToken.js");

router.post("", authToken, async function (req, res) {
  const { status, amount, productId } = req.body;
  const user = req.user.user;

  const created = await createOrder(status, amount, user, productId);
  if (created) {
    return res.send({ msg: "order created" });
  }
  return res.send({ error: "couldn't create order" });
});

router.get("", authToken, async function (req, res) {
  const user = req.user.user;
  const { status } = req.body;

  const cart = await getProductsWithOrders(user, status);
  if (cart) {
    return res.send(cart);
  }
  return res.send({ error: "couldn't find orders" });
});

module.exports = router;
