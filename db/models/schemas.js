const { Sequelize, DataTypes } = require('sequelize');

// connect db
const connection = new Sequelize({
      host:'localhost',
      dialect: 'postgres',
      storage: 'path/to/database.postgres',
      user: 'ebendc',
      password: "112233",
      port: 5432,
      database:'ecommerce'
  });

try {const tryConnect =async ()=>{ await connection.authenticate()}
    tryConnect
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
}

// define article model
const Users = connection.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING,
    unique: true,
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
    unique: true,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.DATE,
    default: new Date()
  },
  updatedAt: {
    type: Sequelize.DATE,
    default: new Date()
  },
  deletedAt: {
    type: Sequelize.DATE,
    default: new Date()
  }
})  ;


const Items = connection.define("items",{ 
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
  codes: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  totalItems: {
    type: Sequelize.STRING,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    default: new Date()
  },
  updatedAt: {
    type: Sequelize.DATE,
    default: new Date()
  },
  deletedAt: {
    type: Sequelize.DATE,
    default: new Date()
  }
});

const Orders = connection.define("orders",{ 
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: Users,
      key:"id"
    },
    onUpdate: "CASCADE",
    onDelete:"CASCADE"
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  status: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    default: new Date()
  },
  updatedAt: {
    type: Sequelize.DATE,
    default: new Date()
  },
  deletedAt: {
    type: Sequelize.DATE,
    default: new Date()
  }
});

const OrderItem = connection.define("orderItems",{ 
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Orders,
      key:"id"
    },
    onUpdate: "CASCADE",
    onDelete:"CASCADE"
  },
  itemId: {
    type: Sequelize.INTEGER,
    references: {
      model: Items,
      key:"id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  createdAt: {
    type: Sequelize.DATE,
    default: new Date()
  },
  updatedAt: {
    type: Sequelize.DATE,
    default: new Date()
  },
  deletedAt: {
    type: Sequelize.DATE,
    default: new Date()
  }
});

Users.associate = () => {
  Users.hasMany(Orders, { as: "orders" });
}
Orders.associate = () => {
  Orders.belongsTo(Users, {
    foreignKey: "id",
    as: "userId"
  });
  Orders.belongsToMany(Items, {
    through: "orderItems",
    as: "orderId",
    foreignKey: "id"
  });
}
Items.associate = () => {
  Items.belongsToMany(Orders, {
    through: "orderItems",
    as: "itemId",
    foreignKey: "id"
  });
}
OrderItem.associate = () => {
  OrderItem.belongsTo(Orders, { foreignKey: "id",as:"orderId"})
  OrderItem.belongsTo(Items, { foreignKey: "id",as:"itemId" })
}









// connection.sync();
module.exports = {
  Users,
  Items,
  Orders,
  OrderItem
}