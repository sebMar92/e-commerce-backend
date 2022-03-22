const { Category } = require("../../database.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getCategories = async (query) => {
  try {
    const categories = query
      ? await Category.findAll({ where: { name: { [Op.iLike]: `%${query}%` } } })
      : await Category.findAll();
    const categoriesResult = categories.map((category) => category.name);
    return categories;
  } catch (err) {
    console.log(err);
  }
};
module.exports = getCategories;
