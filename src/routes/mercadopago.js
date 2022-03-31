const router = require('express').Router();
const payMercadoPago = require('../controllers/mercadopago/payMercadoPago.js');

router.post('/pay', async function (req, res) {
  const preferenceId = await payMercadoPago(req.body);
  return res.status(200).send(preferenceId);
});

module.exports = router;
