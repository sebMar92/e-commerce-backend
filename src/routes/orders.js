const router = require('express').Router();
const changeBulkOrderStatus = require('../controllers/bulkOrders/changeBulkOrderStatus.js');
const createBulkOrder = require('../controllers/bulkOrders/createBulkOrder.js');
const deleteBulkOrder = require('../controllers/bulkOrders/deleteBulkOrder.js');
const getAllBulkOrders = require('../controllers/bulkOrders/getAllBulkOrders.js');
const getBulkOrders = require('../controllers/bulkOrders/getBulkOrders.js');
const changeOrderAmount = require('../controllers/orders/changeOrderAmount.js');
const changeOrderStatus = require('../controllers/orders/changeOrderStatus.js');
const createOrder = require('../controllers/orders/createOrder.js');
const deleteOrder = require('../controllers/orders/deleteOrder.js');
const getProductsWithOrders = require('../controllers/orders/getProductsWithOrders.js');
const authToken = require('./middlewares/authToken.js');
//create order (depende el status si la agrega a wishlist, carrito, pasa a pendiente de compra -durante la pasarela- o a compra terminada)
router.post('', authToken, async function (req, res) {
  try {
    const { status, amount, productId } = req.body;
    const user = req.user.user;
  
    const created = await createOrder(status, amount, user, productId);
    if (typeof created !== 'boolean') {
      return res.send(created);
    } else if (created) {
      return res.send({ msg: 'order created' });
    }
    return res.send({ error: "couldn't create order" });
  }catch(err){
    console.log(err);
  }
});
// trae las ordenes con el status pedido (para traer el carro de compras, la wishlist, historial, etc)
router.get('', authToken, async function (req, res) {
  try {
    const user = req.user.user;
    const { status } = req.query;
  
    const cart = await getProductsWithOrders(user, status, user.id);
    if (cart) {
      return res.send(cart);
    }
    return res.send({ error: "couldn't find orders" });
  } catch(err){
    console.log(err);
  }
});

//modificar estado de orden (pasar de wishlist a carrito, de carrito a pendiente, de pendiente a terminado, etc)
//modificar cantidad de la orden
router.put('/:id', authToken, async function (req, res) {
  try {
    const { status, amount, date, purchaseId } = req.body;
    const { id } = req.params; 
    if (status) {
      const orderChanged = await changeOrderStatus(id, status, req.user.user, date,purchaseId);
      if (typeof orderChanged !== 'boolean') {
        return res.send(orderChanged);
      } else if (orderChanged) {
        return res.send({ msg: 'status changed' });
      }
    } else if (amount) {
      const orderChanged = await changeOrderAmount(id, amount);
      if (typeof orderChanged !== 'boolean') {
        return res.send(orderChanged);
      } else if (orderChanged) {
        return res.send({ msg: 'amount changed' });
      }
    }
  
    return res.send({ error: "couldn't edit order" });
  } catch(err){
    console.log(err);
  }
});
// borrar order (quitar de wishlist, quitar de carrito, cancelar compra)
router.delete('/:id', authToken, async function (req, res) {
  try {
    const { id } = req.params;
  
    const orderDeleted = await deleteOrder(id);
    if (orderDeleted) {
      return res.send({ msg: 'order deleted' });
    }
    return res.send({ error: "couldn't find order" });
  } catch(err){
    console.log(err);
  }
});
// trae las ordenes con el status pedido (para traer el carro de compras, la wishlist, historial, etc)
router.get('/bulk', authToken, async function (req, res) {
  try {
    const user = req.user.user;
    const { status } = req.query;
  
    const cart = await getBulkOrders(user, status);
    if (cart) {
      return res.send(cart);
    }
    return res.send({ error: "couldn't find orders" });
  } catch(err){
    console.log(err);
  }
});
router.post('/bulk', authToken, async function (req, res) {
  try {
    const { orderIds } = req.body;
    const user = req.user.user;
  
    const created = await createBulkOrder({ orderIds: orderIds, user: user });
    if (typeof created !== 'boolean') {
      return res.send(created);
    } else if (created) {
      return res.send({ msg: 'bulk order created' });
    }
    return res.send({ error: "couldn't create bulk order" });
  } catch(err){
    console.log(err);
  }
});
router.put('/bulk/:bulkId', authToken, async function (req, res) {
  try {
    const { status, date, purchaseId } = req.body;
    const { bulkId } = req.params;
    const orderChanged = await changeBulkOrderStatus({
      bulkId: bulkId,
      status: status,
      date: date,
      purchaseId: purchaseId, 
    });
    if (typeof orderChanged !== 'boolean') {
      return res.send(orderChanged);
    } else if (orderChanged) {
      return res.send({ msg: 'status changed' });
    }
    return res.send({ error: "couldn't edit bulk order" });
  } catch(err){
    console.log(err);
  }
});
router.delete('/bulk/:bulkId', authToken, async function (req, res) {
  try {
    const { bulkId } = req.params;
  
    const orderDeleted = await deleteBulkOrder(bulkId);
    if (orderDeleted) {
      return res.send({ msg: 'bulkorder deleted' });
    }
    return res.send({ error: "couldn't find bulkorder" });
  } catch(err){
    console.log(err);
  }
});

router.get('/admin/bulk', authToken, async function (req, res) {
  try {
    const { status, userId } = req.query;
  
    const cart = await getAllBulkOrders(status, userId);
    if (cart) {
      return res.send(cart);
    }
    return res.send({ error: "couldn't find orders" });
  } catch(err){
    console.log(err);
  }
});
module.exports = router;
