const { DataTypes } = require("sequelize");
const database = require("../database");

module.exports = (sequelize) => {
  sequelize.define(
    "category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://www.warnborough.online/wp-content/uploads/2017/05/technology-785742_1920.jpg",
      },
    },
    {
      //creo index en las opciones del modelo para poner propiedad unique
      //asi luego al crear nunca se repiten
      indexes: [
        {
          unique: true,
          fields: ["name"],
        },
      ],
    }
  );
};
