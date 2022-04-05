const router = require("express").Router();
const getCategories = require("../controllers/category/getCategories.js");

router.get("", async function (req, res) {
  try {
    const { search } = req.query;
    const categories = await getCategories(search);
    return res.status(200).send(categories);
  } catch(err){
    console.log(err);
  }
});

module.exports = router;
