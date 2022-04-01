const categoriesToStrings = async (products) => {
  const editableProducts = products.map((product) => product.toJSON());
  const productsWithSimpleCategories = editableProducts.map((product) => {
    const categoryName = product.categories.map((category) => category.name);
    return { ...product, categories: categoryName };
  });
  return productsWithSimpleCategories;
};

module.exports = categoriesToStrings;
