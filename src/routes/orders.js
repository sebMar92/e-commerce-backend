const router = require("express").Router();
const changeOrderStatus = require("../controllers/orders/changeOrderStatus.js");
const createOrder = require("../controllers/orders/createOrder.js");
const getProductsWithOrders = require("../controllers/orders/getProductsWithOrders.js");
const authToken = require("./middlewares/authToken.js");
//create order (depende el status si la agrega a wishlist, carrito, pasa a pendiente de compra -durante carrusel- o a compra terminada)
router.post("", authToken, async function (req, res) {
  const { status, amount, productId } = req.body;
  const user = req.user.user;

  const created = await createOrder(status, amount, user, productId);
  if (created) {
    return res.send({ msg: "order created" });
  }
  return res.send({ error: "couldn't create order" });
});
// trae las ordenes con el status pedido (para traer el carro de compras, la wishlist, historial, etc)
router.get("", authToken, async function (req, res) {
  const user = req.user.user;
  const { status } = req.body;

  const cart = await getProductsWithOrders(user, status);
  if (cart) {
    return res.send(cart);
  }
  return res.send({ error: "couldn't find orders" });
});
//modificar estado de orden (pasar de wishlist a carrito, de carrito a pendiente, de pendiente a terminado, etc)
router.put("/:id", authToken, async function (req, res) {
  const { status } = req.body;
  const { id } = req.query;

  const orderChanged = await changeOrderStatus(id, status);
  if (orderChanged) {
    return res.send({ msg: "status changed" });
  }
  return res.send({ error: "couldn't edit order status" });
});

router.delete("/:id", authToken, async function (req, res) {
  const { id } = req.query;

  const orderDeleted = await changeOrderStatus(id);
  if (orderDeleted) {
    return res.send({ msg: "order deleted" });
  }
  return res.send({ error: "couldn't find order" });
});

module.exports = router;
