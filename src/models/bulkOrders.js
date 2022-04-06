const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('bulkorder', {
    status: {
      type: DataTypes.ENUM(
        'pending',
        'finished',
        'preparing',
        'onDelivery',
        'delivered',
        'cancelled'
      ),
      allowNull: false,
    },
    purchaseId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serverPurchaseDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    localPurchaseDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serverDeliverDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    localDeliverDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serverCancelDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    localCancelDate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    combinedPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    combinedShippingCost: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  });
};
