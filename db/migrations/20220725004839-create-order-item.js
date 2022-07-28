'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable(
      'orderItems',
      { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          allowNull: false
        },
        orderId: {
          type: Sequelize.INTEGER,
          references: {
            model: "orders",
            key:"id"
          },
          onUpdate: "CASCADE",
          onDelete:"CASCADE"
        },
        itemId: {
          type: Sequelize.INTEGER,
          references: {
            model: "items",
            key:"id"
          },
          onUpdate: "CASCADE",
          onDelete:"CASCADE"
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        totalItem: {
          type: Sequelize.INTEGER,
          allowNull: false
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
