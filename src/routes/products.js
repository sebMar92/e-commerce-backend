const router = require("express").Router();
const { Product } = require("../database.js");
const getProducts = require("../controllers/products/getProducts.js");

router.get("", async function (req, res) {
  const { search } = req.query;
  if (search) {
    const allProducts = await getProducts();
    const searchedProduct = allProducts.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
    return res.status(200).send(searchedProduct);
  }
  const products = await getProducts();
  return res.status(200).send(products);
});

module.exports = router;
