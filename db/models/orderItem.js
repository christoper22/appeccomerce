const { Sequelize, DataTypes } = require('sequelize');
const connection = require('./sequelize');
const Orders = require('./order');
const Items = require('./item');
class OrderItem extends Sequelize.Model {}

OrderItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: Orders,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    itemId: {
      type: DataTypes.INTEGER,
      references: {
        model: Items,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalItem: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    timestamp: true,
    // underscored: true,
    // paranoid: true,
    freezeTableName: true,
    tableName: 'orderItems',
  }
);

module.exports = OrderItem;
