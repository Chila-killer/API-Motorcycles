const { DataTypes } = require("sequelize")
const { sequelize } = require("../../config/database/database")

const Error = sequelize.define('errors', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING(10), 
        allowNull: true
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    stack: {
        type: DataTypes.TEXT,
        allowNull: true
    }
})

module.exports = Error