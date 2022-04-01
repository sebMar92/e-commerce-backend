const products = require("./products.json");
const sales = require("./sales.json");
const { Product, Sale } = require("../database.js");
const createAndAddSale = require("../controllers/sales/createAndAddSale");
const users = require("./users.json");
const createProduct = require("../controllers/products/createProduct.js");
const createUser = require("../controllers/user/createUser");

const loadMockData = async () => {
  console.log("loading mock data");
  for await (const p of products) {
    await createProduct(p);
  }
  for await (const s of sales) {
    await createAndAddSale(s);
  }
  for (const u of users) {
    await createUser(u);
  }

  console.log("mock data loaded");
};

module.exports = loadMockData;
