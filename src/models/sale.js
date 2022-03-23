const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("sale", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day: {
      type: DataTypes.ENUM(
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
        "all"
      ),
      allowNull: false,
      defaultValue: "all",
    },
    productAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    global: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
