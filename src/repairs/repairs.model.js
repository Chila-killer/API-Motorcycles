const { DataTypes } = require('sequelize')

const { sequelize } = require('../config/database/database')

const Repairs = sequelize.define("repairs", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false
    },

    date: {
        type: DataTypes.DATE(),
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending'
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = Repairs