const router = require("express").Router();
const { Product } = require("../database.js");
const getProducts = require("../controllers/products/getProducts.js");

router.get("", async function (req, res) {
  const products = await getProducts();
  res.send(products);
});

module.exports = router;
