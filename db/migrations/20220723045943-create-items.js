'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable(
      'items',
      { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true
        },
        name: {
          type: Sequelize.STRING,
          unique: true
        },
        codes: {
          type: Sequelize.STRING
        },
        price: {
          type: Sequelize.INTEGER
        },
        totalItems: {
          type: Sequelize.INTEGER
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('items');
  }
};
