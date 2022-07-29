const Users = require('./user');
const Items = require('./item');
const Orders = require('./order');
const OrderItem = require('./orderItem');
const Roles = require('./roles');
const connection = require('./sequelize');

  Roles.hasMany(Users,{as:"users",foreignKey:"roleId"})

  Users.belongsTo(Roles,{as:"role",foreignKey:"roleId"})
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

  Orders.hasMany(OrderItem, {
    as: "order",
    foreignKey:"orderId"
  })
  


  Items.belongsToMany(Orders, {
    through: "orderItems",
    as: "order",
    foreignKey: "itemId"
  });

  Items.hasMany(OrderItem,{
    as: "item",
    foreignKey:"itemId"
  })

  OrderItem.belongsTo(Orders, { foreignKey: "orderId",as:"order"})
  OrderItem.belongsTo(Items, { foreignKey: "itemId",as:"item" })

module.exports = {
  connection,
  Users,
  Items,
  Orders,
  OrderItem,
  Roles
  }