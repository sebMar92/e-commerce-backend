const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("newsletter", {
    template: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });
};
