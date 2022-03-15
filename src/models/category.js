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
    }
    // {
    //   //creo index en las opciones del modelo para poner propiedad unique
    //   //asi luego al crear nunca se repiten
    //   indexes: [
    //     {
    //       unique: true,
    //       fields: ["name"],
    //     },
    //   ],
    // }
  );
};
