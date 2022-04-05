const router = require('express').Router();
const authToken = require('./middlewares/authToken.js');
const createAndAddComment = require('../controllers/comment/createAndAddComment.js');
const editComment = require('../controllers/comment/editComment.js');
const deleteComment = require('../controllers/comment/deleteComment.js');
const getComments = require('../controllers/comment/getComments.js');

router.post('', authToken, async function (req, res) {
  try {
    const newComment = await createAndAddComment(req.body, req.user.user);
    return res.send({ msg: newComment });
  } catch(err){
    console.log(err);
  }
});

router.put('', authToken, async function (req, res) {
  try {
    const didEdit = await editComment(req.body);
    if (didEdit) {
      return res.send({ msg: 'comment edited' });
    }
    return res.send({ error: "couldn't edit comment" });
  } catch(err){
    console.log(err);
  }
});

router.delete('', authToken, async function (req, res) {
  try {
    const didDelete = await deleteComment(req.body.id);
    if (didDelete) {
      return res.send({ msg: 'comment deleted' });
    }
    return res.send({ error: "couldn't delete comment" });
  } catch(err){
    console.log(err);
  }
});

router.get('', async function (req, res) {
  try {
    const comments = await getComments(req.query.productId);
    return res.send(comments);
  } catch(err){
    console.log(err);
  }
});

module.exports = router;
