const products = require("./products.json");
const sales = require("./sales.json");
const { Product, Sale } = require("../database.js");
const createProduct = require("../controllers/products/createProduct.js");
const createAndAddSale = require("../controllers/sales/createAndAddSale");

const loadMockData = async () => {
  console.log("loading mock data");
  for await (const p of products) {
    await createProduct(p);
  }
  // for await (const s of sales) {
  //   await createAndAddSale(s);
  // }
  console.log("mock data loaded");
};

module.exports = loadMockData;
