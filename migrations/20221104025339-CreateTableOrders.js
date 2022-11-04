'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id:{ type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
      productId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'products',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      userId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      numberOfProductsAdded: Sequelize.INTEGER,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
