const { Comment, User } = require('../../database.js');

const getComments = async (productId) => {
  try {
    const comments = await Comment.findAll({
      where: { productId: productId },
    });
    const parsedComments = [];
    for await (let comment of comments) {
      comment = comment.toJSON();

      const userData = await User.findOne({
        where: {
          id: comment.userId,
        },
      });
      delete comment.userId;

      comment.userInfo = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      };
      parsedComments.push(comment);
    }

    return parsedComments;
  } catch (err) {
    console.log(err);
    return { error: 'no comments on this product yet' };
  }
};
module.exports = getComments;
