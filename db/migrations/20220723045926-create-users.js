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
          unique: true,
          allowNull: false
        },
        userName: {
          type: Sequelize.STRING,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          isEmail: true,
          allowNull: false
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: false
        },
        roleId: {
          type: Sequelize.INTEGER,
          references: {
            model: "roles",
            key:"id"
          },
          onUpdate:"CASCADE",
          onDelete: "CASCADE",
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
        },
        
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
