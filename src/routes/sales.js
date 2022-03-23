const router = require("express").Router();
const authToken = require("./middlewares/authToken.js");
const createAndAddSale = require("../controllers/sales/createAndAddSale.js");
const deleteSale = require("../controllers/sales/deleteSale.js");

router.post("", authToken, async function (req, res) {
  const newSale = await createAndAddSale(req.body);
  if (newSale) {
    return res.send({ msg: "sale created" });
  }
  return res.send({ error: "couldn't create sale" });
});

router.delete("", authToken, async function (req, res) {
  const { id } = req.body;
  const didDelete = deleteSale(id);
  if (didDelete) {
    return res.send({ msg: "sale deleted" });
  }
  return res.send({ error: "couldn't delete sale" });
});

module.exports = router;
