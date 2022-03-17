const router = require("express").Router();
const getProducts = require("../controllers/products/getProducts.js");

router.get("/:idProduct", async (req, res) => {
    const id = req.params.idProduct;
    const allProducts = await getProducts();
    const productByID = allProducts.find(product => product.id == id);
    return res.status(200).send(productByID);
})

module.exports = router;