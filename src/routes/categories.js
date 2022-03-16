const router = require("express").Router();
const getCategories = require("../controllers/category/getCategories.js");

router.get("", async function (req, res){
    const categories = await getCategories();
    return res.status(200).send(categories);
});

module.exports = router;