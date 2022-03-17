const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const paginationCompose = async (page, itemsPerPage) => {
  if (!itemsPerPage) {
    itemsPerPage = 16; //default
  }
  if (!page) {
    page = 1;
  }
  var orderStatement = {
    offset: (page - 1) * itemsPerPage,
    limit: itemsPerPage,
  };
  return orderStatement;
};

module.exports = paginationCompose;
