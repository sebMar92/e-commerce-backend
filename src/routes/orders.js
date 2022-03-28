const router = require('express').Router();
const changeOrderAmount = require('../controllers/orders/changeOrderAmount.js');
const changeOrderStatus = require('../controllers/orders/changeOrderStatus.js');
const createOrder = require('../controllers/orders/createOrder.js');
const deleteOrder = require('../controllers/orders/deleteOrder.js');
const getProductsWithOrders = require('../controllers/orders/getProductsWithOrders.js');
const authToken = require('./middlewares/authToken.js');
//create order (depende el status si la agrega a wishlist, carrito, pasa a pendiente de compra -durante la pasarela- o a compra terminada)
router.post('', authToken, async function (req, res) {
  const { status, amount, productId } = req.body;
  const user = req.user.user;

  const created = await createOrder(status, amount, user, productId);
  if (created) {
    return res.send({ msg: 'order created' });
  }
  return res.send({ error: "couldn't create order" });
});
// trae las ordenes con el status pedido (para traer el carro de compras, la wishlist, historial, etc)
router.get('', authToken, async function (req, res) {
  const user = req.user.user;
  const { status } = req.query;

  const cart = await getProductsWithOrders(user, status);
  if (cart) {
    return res.send(cart);
  }
  return res.send({ error: "couldn't find orders" });
});
//modificar estado de orden (pasar de wishlist a carrito, de carrito a pendiente, de pendiente a terminado, etc)
//modificar cantidad de la orden
router.put('/:id', authToken, async function (req, res) {
  const { status, amount } = req.query;
  const { id } = req.params;
  if (status) {
    const orderChanged = await changeOrderStatus(id, status);
    if (orderChanged) {
      return res.send({ msg: 'status changed' });
    }
  } else if (amount) {
    const orderChanged = await changeOrderAmount(id, amount);
    if (orderChanged) {
      return res.send({ msg: 'amount changed' });
    }
  }

  return res.send({ error: "couldn't edit order" });
});
// borrar order (quitar de wishlist, quitar de carrito, cancelar compra)
router.delete('/:id', authToken, async function (req, res) {
  const { id } = req.params;
  const orderDeleted = await deleteOrder(id);
  if (orderDeleted) {
    return res.send({ msg: 'order deleted' });
  }
  return res.send({ error: "couldn't find order" });
});

module.exports = router;
