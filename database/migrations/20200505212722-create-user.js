'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(32)
      },
      displayName: {
        type: Sequelize.STRING(254)
      },
      email: {
        type: Sequelize.STRING(254)
      },
      provider: {
        allowNull: false,
        type: Sequelize.STRING
      },
      picture: {
        allowNull: true,
        type: Sequelize.TEXT        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};