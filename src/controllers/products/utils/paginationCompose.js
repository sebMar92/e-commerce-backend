const Sequelize = require("sequelize");

const Op = Sequelize.Op;

const paginationCompose = async (page, itemsPerPage) => {
  try {
    if (!itemsPerPage) {
      itemsPerPage = 16; //default 16
    }
    if (!page) {
      page = 1; //default 1
    }
    var orderStatement = {
      offset: (page - 1) * itemsPerPage,
      limit: itemsPerPage,
    };
    return orderStatement;
  } catch(err){
    console.log(err);
  }
};

module.exports = paginationCompose;
