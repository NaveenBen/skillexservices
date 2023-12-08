const {sequelize}   = require('../config/database');
const {DataTypes}   = require('sequelize');

const User = sequelize.define("User",{
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'name'
    },
    role :{
        type: DataTypes.STRING,
        allowNull: false,
        field: 'role',
        defaultValue: 'user'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'email'
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_hash'
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'updated_at'
    }

},{
    tableName: 'users',
    timestamps: false
})

module.exports = User;