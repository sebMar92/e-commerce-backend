const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const filterCompose = async (
  search, //search = "microsoft"
  minPrice, //minPrice = 10
  maxPrice, //maxPrice = 100
  freeShipping, //freeShipping = true/false
  categoryId //categoryId = 6
) => {
  var whereStatement = { where: {} };
  if (search) {
    whereStatement.where.name = { [Op.iLike]: `%${search}%` };
  }
  if (minPrice || maxPrice) {
    min = minPrice ? minPrice : 0;
    max = maxPrice ? maxPrice : Infinity;

    whereStatement.where.price = { [Op.between]: [min, max] };
  }
  if (freeShipping) {
    whereStatement.where.shippingCost = 0;
  }
  var categoryWhereStatement = { where: {} };
  if (categoryId) {
    categoryWhereStatement.where.id = categoryId;
  }

  return [whereStatement, categoryWhereStatement];
};

module.exports = filterCompose;
