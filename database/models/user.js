'use strict';
module.exports = (sequelize, DataTypes) => {

  const Op = sequelize.Sequelize.Op;

  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    provider: DataTypes.STRING,
    picture: DataTypes.TEXT
  }, {
    name: {
      singular: "User",
      plural: "Users",
    },
    tableName: "Users"
  });
  User.associate = function(models) {
    
    User.hasMany(models.Pensiero, {
      foreignKey: 'userId'
    });

    User.hasMany(models.Like, {
      foreignKey: 'userId'
    });
    
  };

  User.createUsernameByDisplayName = function(displayName){
  const partialUsername = displayName.replace(/\s+/g, '').toLowerCase();;
  
  return User.findAndCountAll({
      where: {
        username: {
            [Op.like]: partialUsername + '.%'
        }
      }
    })
    .then(function(result){
      return partialUsername.concat('.',result.count+1);
    });
    
    
  }

  return User;
};