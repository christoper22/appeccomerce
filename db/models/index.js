const Users = require('./user');
const Items = require('./item');
const Orders = require('./order');
const OrderItem = require('./orderItem');
const connection = require('./sequelize');

  Users.hasMany(Orders, { as:"orders",foreignKey: "userId"});


  Orders.belongsTo(Users, {
    as: "user",
    foreignKey: "userId",
  
  });
  Orders.belongsToMany(Items, {
    through: "orderItems",
    as: "item",
    foreignKey: "orderId"
  });


  Items.belongsToMany(Orders, {
    through: "orderItems",
    as: "order",
    foreignKey: "itemId"
  });


  OrderItem.belongsTo(Orders, { foreignKey: "orderId",as:"item"})
  OrderItem.belongsTo(Items, { foreignKey: "itemId",as:"order" })

module.exports = {
  connection,
  Users,
  Items,
  Orders,
  OrderItem
  }