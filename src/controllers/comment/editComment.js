const { Comment } = require("../../database.js");

const editComment = async (data) => {
  try {
    const { id, content, rating } = data;
    const comment = await Comment.findOne({ where: { id: id } });
    if (comment) {
      if (content) {
        comment.content = content;
      }
      if (rating) {
        comment.rating = rating.toString();
      }
      comment.save();
      return true;
    }
  } catch(err){
    console.log(err);
    return false;
  }
};

module.exports = editComment;
