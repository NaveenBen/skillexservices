const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.dbUrl, {
dialect: 'postgres'
});

module.exports = {
sequelize,Sequelize
}