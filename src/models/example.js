import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("example", {
    name: {
      type: DataTypes.STRING,
    },
  });
};
