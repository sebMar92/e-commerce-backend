const products = require('./products.json');
const sales = require('./sales.json');
const { Product, Sale } = require('../database.js');
const createAndAddSale = require('../controllers/sales/createAndAddSale');
const users = require('./users.json');
const createProduct = require('../controllers/products/createProduct.js');
const createUser = require('../controllers/user/createUser');
const orders = require('./orders.json');
const createOrder = require('../controllers/orders/createOrder');
const bulkorders = require('./bulkorders.json');
const createBulkOrder = require('../controllers/bulkOrders/createBulkOrder.js');
const { Bulkorder} = require('../database.js');
const changeBulkOrderStatus = require('../controllers/bulkOrders/changeBulkOrderStatus');
const changeOrderStatus = require('../controllers/orders/changeOrderStatus');

const loadMockData = async () => {
  console.log('loading mock data');
  for await (const p of products) {
    await createProduct(p);
  }
  for await (const s of sales) {
    await createAndAddSale(s);
  }
  for await (const u of users) {
    await createUser(u);
  }
  for await (const o of orders) {
    await createOrder(o.status, o.amount, { id: o.userId }, o.productId);
  }
  for await (const bo of bulkorders) {
    await createBulkOrder(bo);
  } 
  /* const bulks = await Bulkorder.findAll();
  for await (const bulk of bulks) {
    changeBulkOrderStatus({
      bulkId: bulk.id,
      status: 'finished',
      date: Date(),
      purchaseId: '123idfalso',
    });
  }
  await changeOrderStatus(5, 'finished', { id: 1 }, Date(), '123idfalso'); */

  
  console.log('mock data loaded');
};

module.exports = loadMockData;
