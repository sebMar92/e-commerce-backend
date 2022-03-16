const { Category } = require("../../database.js");

const createAndAddCategories = async (categories, product) => {
  try {
    const parsedCategories = categories.map((c) => {
      return { name: c };
    });
    for await (const category of parsedCategories) {
      const [newCategory, created] = await Category.findOrCreate({
        where: {
          name: category.name,
        },
      });
      product.addCategories(newCategory);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = createAndAddCategories;
