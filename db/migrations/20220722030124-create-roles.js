'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable(
      'roles',
      { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM,
          values: ['ACTIVE','NONACTIVE'],
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
    await queryInterface.dropTable('roles');
  }
};
