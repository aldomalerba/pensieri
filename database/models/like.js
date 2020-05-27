'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pensieroId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Like.associate = function(models) {

    Like.belongsTo(models.User, {
      foreignKey: 'userId'
    });

    Like.belongsTo(models.Pensiero, {
      foreignKey: 'userId'
    });

  };
  return Like;
};