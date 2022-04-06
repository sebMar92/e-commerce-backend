const categoriesToStrings = async (products) => {
  try {
    const editableProducts = products.map((product) => product.toJSON());
    const productsWithSimpleCategories = editableProducts.map((product) => {
      const categoryName = product.categories.map((category) => category.name);
      return { ...product, categories: categoryName };
    });
    return productsWithSimpleCategories;
  } catch(err){
    console.log(err);
  }
};

module.exports = categoriesToStrings;
