const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    'user',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          'https://cdn.pixabay.com/photo/2015/01/01/22/15/woman-586185_960_720.jpg',
        validate: {
          isUrl: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      rol: {
        type: DataTypes.ENUM('guest', 'user', 'admin'),
        allowNull: false,
        defaultValue: 'user',
      },
      newsletterSubscription: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      googleUser: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['email'],
        },
      ],
    }
  );
};
