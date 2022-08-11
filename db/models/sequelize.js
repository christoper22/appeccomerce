const { Sequelize } = require('sequelize');
const config = require('../../config/config');
// connect db
const connection = new Sequelize({
  host: config.host,
  dialect: config.dialect,
  storage: 'path/to/database.postgres',
  user: config.username,
  password: config.password,
  port: config.port,
  database: config.database,
});

try {
  const tryConnect = async () => {
    await connection.authenticate();
  };
  tryConnect();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = connection;
