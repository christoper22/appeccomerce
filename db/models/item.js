const { Sequelize, DataTypes } = require('sequelize')
const connection = require('./sequelize')

class Items extends Sequelize.Model{}

Items.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      codes: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      totalItems: {
        type: DataTypes.STRING,
        allowNull: false
      }
}, {
    sequelize: connection,
    timestamp: true,
    // underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName:"items"
}
)

module.exports = Items