const products = require("./products.json");
<<<<<<< HEAD
const sales = require("./sales.json");
const { Product, Sale } = require("../database.js");
const createProduct = require("../controllers/products/createProduct.js");
const createAndAddSale = require("../controllers/sales/createAndAddSale");
=======
const users = require("./users.json");
const createProduct = require("../controllers/products/createProduct.js");
const createUser = require("../controllers/user/createUser");
>>>>>>> f00ec937bcf357dbcadb7bf68cc1d18b8a5b5fb2

const loadMockData = async () => {
  console.log("loading mock data");
  for await (const p of products) {
    await createProduct(p);
  }
<<<<<<< HEAD
  // for await (const s of sales) {
  //   await createAndAddSale(s);
  // }
=======
  for (const u of users) {
    await createUser(u);
  }

>>>>>>> f00ec937bcf357dbcadb7bf68cc1d18b8a5b5fb2
  console.log("mock data loaded");
};

module.exports = loadMockData;
