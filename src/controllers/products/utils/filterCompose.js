const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const filterCompose = async (
  search, //search = "microsoft"
  minPrice, //minPrice = 10
  maxPrice, //maxPrice = 100
  freeShipping, //freeShipping = true/false
  categoryId //categoryId = 6
) => {
  var whereStatement = { where: { stock: { [Op.gt]: 0 } } }; // default - only show those with at least 1 available stock
  if (search) {
    whereStatement.where.name = { [Op.iLike]: `%${search}%` };
  }
  if (minPrice || maxPrice) {
    min = minPrice ? minPrice : 0;
    max = maxPrice ? maxPrice : Infinity;

    whereStatement.where.price = { [Op.between]: [min, max] };
  }
  if (freeShipping === "true") {
    whereStatement.where.shippingCost = 0;
  }
  var categoryWhereStatement = { where: {} };
  if (categoryId) {
    categoryWhereStatement.where.id = categoryId;
  }

  return [whereStatement, categoryWhereStatement];
};

module.exports = filterCompose;
