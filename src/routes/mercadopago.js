const router = require('express').Router();
const payMercadoPago = require('../controllers/mercadopago/payMercadoPago.js');
const mercadopago = require('mercadopago');
const { route } = require('express/lib/application');

router.post('/user');

router.post('/pay', function (req, res) {
  /*  const preferenceId = await payMercadoPago(req.body); */
  const preference = payMercadoPago(req.body);

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      return res.json({ id: response.body.id });
    })
    .catch(function (error) {
      return res.sendStatus(500);
    });
  /*   return res.status(200).send(preferenceId); */
});
//mercadopago.payment.cancel
//mercadopago.refund

router.get('/feedback', function (req, res) {
  try {
    res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
