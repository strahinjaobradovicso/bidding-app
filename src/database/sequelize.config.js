require('ts-node/register');
const config = require('../config');

module.exports = {
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_SCHEMA,
  host: config.DB_HOST,
  dialect: config.DB_DIALECT,
  port: config.DB_PORT
};