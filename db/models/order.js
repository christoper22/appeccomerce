const { Sequelize, DataTypes } = require('sequelize');
const connection = require('./sequelize');
const Users = require('./user');
class Orders extends Sequelize.Model {}

Orders.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: Users,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['PAID', 'CANCEL', 'PENDING'],
    },
  },
  {
    sequelize: connection,
    timestamp: true,
    // underscored: true,
    paranoid: true,
    freezeTableName: true,
    tableName: 'orders',
  }
);

module.exports = Orders;
