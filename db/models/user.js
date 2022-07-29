const { Sequelize, DataTypes } = require('sequelize')
const connection = require('./sequelize')

class Users extends Sequelize.Model { }

Users.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false
  },
  userName: {
    type: DataTypes.STRING,
    unique:true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    isEmail: true,
    unique: true,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: "roles",
      key:"id"
    },
    onUpdate:"CASCADE",
    onDelete: "CASCADE",
    allowNull: false
  },
}, {
  sequelize: connection,
  timestamp: true,
  // underscored: true,
  paranoid: true,
  freezeTableName: true,
  tableName: "users"
}
)

module.exports = Users