const router = require("express").Router();
const getProducts = require("../controllers/products/getProducts.js");

router.get("/:idProduct", async (req, res) => {
    try {
        const id = req.params.idProduct;
        const allProducts = await getProducts();
        const productByID = allProducts.find(product => product.id == id);
        if (productByID) {
            return res.status(200).send(productByID);
        } return res.status(404).send("Product Not Found!")
    } catch(err){
        console.log(err);
    }
})

module.exports = router;