'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    name: {
      singular: "User",
      plural: "Users",
    },
    tableName: "Users"
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Pensiero, {
      foreignKey: 'userId',
      as: 'pensieri',
      onDelete: 'CASCADE',
    });
  };
  return User;
};