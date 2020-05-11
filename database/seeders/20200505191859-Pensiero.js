'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity. */

      return queryInterface.bulkInsert('Pensieri', [{
        frase: "Lorem ipsum lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
        enabled: true,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        frase: "Lorem2 ipsum2 lorem2 ipsum2 Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum",
        backgroundColor: "#000000",
        textColor: "#FFFFFF",
        enabled: true,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
