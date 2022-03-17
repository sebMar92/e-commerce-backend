const router = require("express").Router();
const getProducts = require("../controllers/products/getProducts.js");
const filterCompose = require("../controllers/products/utils/filterCompose.js");
const orderCompose = require("../controllers/products/utils/orderCompose.js");

router.get("", async function (req, res) {
  const { search, minPrice, maxPrice, freeShipping, categoryId, order } =
    req.query;
  var filterConditions = [];
  if (search || minPrice || maxPrice || freeShipping || categoryId) {
    filterConditions = await filterCompose(
      search,
      minPrice,
      maxPrice,
      freeShipping,
      categoryId
    );
  }
  if (order) {
    var orderDisposition = await orderCompose(order);
  }
  const products = await getProducts(orderDisposition, ...filterConditions);
  return res.status(200).send(products);
});

module.exports = router;
