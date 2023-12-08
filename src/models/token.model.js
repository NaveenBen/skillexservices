const {sequelize}   = require('../config/database');
const {DataTypes}   = require('sequelize');

const Token = sequelize.define("Token",{
    token : {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'token',
        required: true
    },
    user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user',
        required: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'type',
        required: true
    },
    expires: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'expires',
        required: true
    },
    blacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        field: 'blacklisted',
        required: true
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
    tableName: 'tokens',
    timestamps: false
})

module.exports = Token;