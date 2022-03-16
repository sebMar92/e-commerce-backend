const router = require("express").Router();
const getProducts = require("../controllers/products/getProducts.js");
const filterCompose = require("../controllers/products/utils/filterCompose.js");

router.get("", async function (req, res) {
  const { search, minPrice, maxPrice, freeShipping, categoryId } = req.query;
  var filterConditions = [undefined, undefined];
  if (search || minPrice || maxPrice || freeShipping || categoryId) {
    filterConditions = await filterCompose(
      search,
      minPrice,
      maxPrice,
      freeShipping,
      categoryId
    );
  }
  const products = await getProducts(...filterConditions);
  return res.status(200).send(products);
});

module.exports = router;
