const { DataTypes } = require('sequelize')

const { sequelize } = require('../config/database/database')

const Users = sequelize.define("users", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM('client', 'employee'),
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('available', 'disabled'),
        allowNull: false,
        defaultValue: 'available'
    }
})

module.exports = Users