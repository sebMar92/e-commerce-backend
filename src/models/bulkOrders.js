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
    purchaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deliverDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    cancelDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });
};
