const { sequelize } = require('../config/database');
const { DataTypes } = require('sequelize');

const Todo = sequelize.define(
  'Todo',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'title',
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'status',
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'todo',
      field: 'type',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  },
  {
    tableName: 'todos',
    timestamps: false,
  }
);

module.exports = Todo;
