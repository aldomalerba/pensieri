'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pensiero = sequelize.define('Pensiero', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement : true },
    frase: DataTypes.TEXT,
    backgroundColor: DataTypes.STRING,
    textColor: DataTypes.STRING,
    enabled: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    name: {
      singular: "Pensiero",
      plural: "Pensieri",
    },
    tableName: 'Pensieri'
   });
  Pensiero.associate = function(models) {

    Pensiero.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Pensiero.hasMany(models.Like, {
      foreignKey: 'pensieroId'
    });

    Pensiero.hasOne(models.Like, {
      as: 'userLike',
      foreignKey: 'pensieroId'
    });

  };
  return Pensiero;
};