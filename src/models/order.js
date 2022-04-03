const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('order', {
    status: {
      type: DataTypes.ENUM(
        'inWishList',
        'inCart',
        'pending',
        'finished',
        'preparing',
        'onDelivery',
        'delivered',
        'cancelled'
      ),
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    purchaseId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    serverPurchaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    localPurchaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    serverDeliverDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    localDeliverDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    serverCancelDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    localCancelDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};
