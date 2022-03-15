const products = require("./products.json");
const { Product } = require("../database.js");
const createProduct = require("../controllers/products/createProduct.js");

const loadMockData = async () => {
  console.log("loading mock data");
  for (const p of products) {
    await createProduct(p);
  }
  console.log("mock data loaded");
};

module.exports = loadMockData;
