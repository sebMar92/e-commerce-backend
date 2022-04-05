const router = require('express').Router();
const authToken = require('./middlewares/authToken.js');
const createAndAddSale = require('../controllers/sales/createAndAddSale.js');
const deleteSale = require('../controllers/sales/deleteSale.js');
const getSales = require('../controllers/sales/getSales.js');
const editSale = require('../controllers/sales/editSale.js');

router.post('', authToken, async function (req, res) {
  try {
    if (req.user.user.rol === 'admin') {
      const newSale = await createAndAddSale(req.body);
      if (newSale) {
        return res.send({ msg: 'sale created' });
      }
      return res.send({ error: "couldn't create sale" });
    } else {
      return res.status(403).send({ error: "You don't have permision to do this." });
    }
  } catch(err){
    console.log(err);
  }
});

router.put('', authToken, async function (req, res) {
  try {
    if (req.user.user.rol === 'admin') {
      const editedSale = await editSale(req.body);
      if (editedSale) {
        return res.send({ msg: 'sale edited' });
      }
      return res.send({ error: "couldn't edit sale" });
    } else {
      return res.status(403).send({ error: "You don't have permision to do this." });
    }
  } catch(err){
    console.log(err);
  }
});

router.delete('', authToken, async function (req, res) {
  try {
    if (req.user.user.rol === 'admin') {
      const { saleId } = req.query;
      const didDelete = deleteSale(saleId);
      if (didDelete) {
        return res.send({ msg: 'sale deleted' });
      }
      return res.send({ error: "couldn't delete sale" });
    } else {
      return res.status(403).send({ error: "You don't have permision to do this." });
    }
  } catch(err){
    console.log(err);
  }
});

router.get('', async function (req, res) {
  try {
    const sales = await getSales();
    res.send(sales);
  } catch(err){
    console.log(err);
  }
});

module.exports = router;
