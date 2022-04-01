const { Comment } = require("../../database.js");

const deleteComment = async (id) => {
  const comment = await Comment.findOne({ where: { id: id } });
  if (comment) {
    await comment.destroy({
      where: {
        id: id,
      },
    });
    return true;
  }
  return false;
};

module.exports = deleteComment;
