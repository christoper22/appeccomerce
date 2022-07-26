const Users = require('./user');
const Items = require('./item');
const Orders = require('./order');
const OrderItem = require('./orderItem');
const connection = require('./sequelize');

  Users.hasMany(Orders, { as: "orders" });


  Orders.belongsTo(Users, {
    as: "user",
    foreignKey: "id",
  
  });
  Orders.belongsToMany(Items, {
    through: "orderItems",
    as: "orderId",
    foreignKey: "id"
  });


  Items.belongsToMany(Orders, {
    through: "orderItems",
    as: "itemId",
    foreignKey: "id"
  });


  OrderItem.belongsTo(Orders, { foreignKey: "id",as:"order"})
  OrderItem.belongsTo(Items, { foreignKey: "id",as:"item" })

module.exports = {
  connection,
  Users,
  Items,
  Orders,
  OrderItem
  }