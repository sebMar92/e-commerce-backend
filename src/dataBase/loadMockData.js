const products = require("./products.json");
const users = require("./users.json");
const createProduct = require("../controllers/products/createProduct.js");
const createUser = require("../controllers/user/createUser");

const loadMockData = async () => {
  console.log("loading mock data");
  for (const p of products) {
    await createProduct(p);
  }
  for (const u of users) {
    await createUser(u);
  }

  console.log("mock data loaded");
};

module.exports = loadMockData;
