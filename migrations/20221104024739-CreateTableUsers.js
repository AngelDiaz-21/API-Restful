'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id:{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      name: Sequelize.STRING,
      firstSurname: Sequelize.STRING,
      secondSurname: Sequelize.STRING,
      typeUser: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
