const { Sequelize, DataTypes } = require('sequelize')
const connection = require('./sequelize')

class Roles extends Sequelize.Model { }

Roles.init({
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
}, {
  sequelize: connection,
  timestamp: true,
  // underscored: true,
  paranoid: true,
  freezeTableName: true,
  tableName: "roles"
}
)

module.exports = Roles