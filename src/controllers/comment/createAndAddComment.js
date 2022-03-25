const { Comment, User, Product } = require("../../database.js");

const createAndAddComment = async (data, user) => {
  const { content, rating, productId } = data;
  const foundUser = await User.findOne({ where: { id: user.id } });
  const foundProduct = await Product.findOne({ where: { id: productId } });
  if (foundUser && foundProduct) {
    const existingComment = await Comment.findOne({
      where: { userId: user.id, productId: productId },
    });
    if (existingComment) {
      return "there's already a comment on this product";
    } else {
      const newComment = await Comment.create({
        content: content,
        rating: rating.toString(),
      });
      await foundUser.addComment(newComment);
      await foundProduct.addComment(newComment);
      return "comment created";
    }
  }
  return "user / product not found";
};

module.exports = createAndAddComment;
