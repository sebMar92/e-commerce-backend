const googleAuth = require('../controllers/google/googleAuth');

const router = require('express').Router();

router.post('/login', async function (req, res) {
  // google/login
  const response = await googleAuth(req.body);
  return res.json(response);
});

module.exports = router;
