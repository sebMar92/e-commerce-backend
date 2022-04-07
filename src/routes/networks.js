const router = require('express').Router();
const createAndEditNetworks = require('../controllers/networks/createAndEditNetworks');
const getNetworks = require('../controllers/networks/getNetworks');


router.post('', async (req, res) => {
  try {
    await createAndEditNetworks(req.body);
    res.send({msg: 'Social networks updated'})
  } catch (err) {
    console.log(err);
  }
});

router.get('', async (req, res) => {
  try {
    const networks = await getNetworks();
    res.send(networks);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;