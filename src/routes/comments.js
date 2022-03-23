const router = require("express").Router();
const authToken = require("./middlewares/authToken.js");
const createAndAddComment = require("../controllers/comment/createAndAddComment.js");

router.post("", authToken, async function (req, res) {
  const newComment = await createAndAddComment(req.body, req.user.user);
  return res.send({ msg: newComment });
});

module.exports = router;
