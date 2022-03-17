const router = require("express").Router();
const getProducts = require("../controllers/products/getProducts.js");
const filterCompose = require("../controllers/products/utils/filterCompose.js");
const orderCompose = require("../controllers/products/utils/orderCompose.js");
const paginationCompose = require("../controllers/products/utils/paginationCompose.js");

router.get("", async function (req, res) {
  const {
    search,
    minPrice,
    maxPrice,
    freeShipping,
    categoryId,
    order,
    limit,
    offset,
  } = req.query;
  const filterConditions = await filterCompose(
    search,
    minPrice,
    maxPrice,
    freeShipping,
    categoryId
  );
  const orderDisposition = await orderCompose(order);
  const paginationSettings = await paginationCompose(offset, limit);
  const products = await getProducts(
    orderDisposition,
    paginationSettings,
    ...filterConditions
  );

  return res.status(200).send(products);
});

module.exports = router;
