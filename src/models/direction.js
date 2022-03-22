const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("direction", {
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    floor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};
