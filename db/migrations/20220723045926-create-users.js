'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable(
      'users',
      { 
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          unique: true
        },
        userName: {
          type: Sequelize.STRING
        },
        name: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING,
          isEmail: true
        },
        phone: {
          type: Sequelize.STRING
        },
        roleId: {
          type: Sequelize.INTEGER,
          references: {
            model: "roles",
            key:"id"
          },
          onUpdate:"CASCADE",
          onDelete: "CASCADE"
        },
        createdAt: {
          type: Sequelize.DATE
        },
        updatedAt: {
          type: Sequelize.DATE
        },
        deletedAt: {
          type: Sequelize.DATE
        },
        
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
