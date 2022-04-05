const { Comment } = require("../../database.js");

const deleteComment = async (id) => {
  try {
    const comment = await Comment.findOne({ where: { id: id } });
    if (comment) {
      await comment.destroy({
        where: {
          id: id,
        },
      });
      return true;
    }
  } catch(err){
    console.log(err);
    return false;
  }
};

module.exports = deleteComment;
