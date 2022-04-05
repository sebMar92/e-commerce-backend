const googleAuth = require('../controllers/google/googleAuth');

const router = require('express').Router();

router.post('/login', async function (req, res) {
  try {
    // google/login
    const response = await googleAuth(req.body);
    return res.json(response);
  } catch(err){
    console.log(err);
  }
});

module.exports = router;
