'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable(
      'orders',
      { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          allowNull: false
        },
        userId: {
          type: Sequelize.INTEGER,
          references: {
            model: "users",
            key:"id"
          },
          onUpdate:"CASCADE",
          onDelete: "CASCADE",
          allowNull: false
        },
        totalPrice: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM,
          values: ['PAID', 'CANCEL', 'PENDING'],
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
    await queryInterface.dropTable('orders');
  }
};
