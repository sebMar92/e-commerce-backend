const { Category } = require ("../../database.js");

const getCategories = async() => {
    try{
        const categories = await Category.findAll ();
        const categoriesResult = categories.map((category) => category.name);
        // creo categoriesFinalResult para evitar repeticiones
        const categoriesFinalResult = [...new Set(categoriesResult)]
        return categoriesFinalResult;
    }catch(err){
        console.log(err);
    }
}
module.exports = getCategories;