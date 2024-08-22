const { Sequelize } = require("sequelize");

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const databaseName = process.env.DB_NAME;

// Todo use .env
const sequelize = new Sequelize(databaseName, username, password, {
  host: host,
  dialect: "postgres",
});

module.exports = sequelize;