const { Category } = require("../../database.js");

const createAndAddCategories = async (categories, product) => {
  try {
    const parsedCategories = categories.map((c) => {
      return { name: c };
    });
    for (const category of parsedCategories) {
      //--------Asi debería ser pero no funciona--------
      //   const newCategory = await Category.findOrCreate({
      //     where: {
      //       name: category.name,
      //     },
      //   });
      //   product.addCategories(newCategory);

      //-------Parche temporal. Esto funciona aunque deja algunas categorías repetidas--------
      const checkCategory = await Category.findOne({
        where: {
          name: category.name,
        },
      });
      if (checkCategory) {
        product.addCategories(checkCategory);
      } else {
        const newCategory = await Category.create(category);
        product.addCategories(newCategory);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = createAndAddCategories;
