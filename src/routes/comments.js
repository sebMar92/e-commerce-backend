const router = require('express').Router();
const authToken = require('./middlewares/authToken.js');
const createAndAddComment = require('../controllers/comment/createAndAddComment.js');
const editComment = require('../controllers/comment/editComment.js');
const deleteComment = require('../controllers/comment/deleteComment.js');
const getComments = require('../controllers/comment/getComments.js');

router.post('', authToken, async function (req, res) {
  const newComment = await createAndAddComment(req.body, req.user.user);
  return res.send({ msg: newComment });
});

router.put('', authToken, async function (req, res) {
  const didEdit = await editComment(req.body);
  if (didEdit) {
    return res.send({ msg: 'comment edited' });
  }
  return res.send({ error: "couldn't edit comment" });
});

router.delete('', authToken, async function (req, res) {
  const didDelete = await deleteComment(req.body.id);
  if (didDelete) {
    return res.send({ msg: 'comment deleted' });
  }
  return res.send({ error: "couldn't delete comment" });
});

router.get('', async function (req, res) {
  const comments = await getComments(req.query.productId);
  return res.send(comments);
});

module.exports = router;
