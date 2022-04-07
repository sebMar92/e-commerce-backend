const { Router } = require('express');

// import ruta from "./ruta"
const products = require('./products.js');
const categories = require('./categories.js');
const productByID = require('./productByID');
const users = require('./user.js');
const orders = require('./orders.js');
const sales = require('./sales.js');
const comments = require('./comments.js');
const emails = require('./emails.js');
const mercadopago = require('./mercadopago.js');
const google = require('./google.js');
const networks = require('./networks.js');
const router = Router();
// Configurar los routers
// Ejemplo: router.use('/ruta', ruta);
router.use('/products', products);
router.use('/products', productByID);
router.use('/categories', categories);
router.use('/user', users);
router.use('/order', orders);
router.use('/sale', sales);
router.use('/comment', comments);
router.use('/emails', emails);
router.use('/mercadopago', mercadopago);
router.use('/google', google);
router.use('/networks', networks);

module.exports = router;
