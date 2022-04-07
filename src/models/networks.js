const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("networks", {
    facebook: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    instagram: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
