const { DataTypes } = require('sequelize')

const { sequelize } = require('../../config/database/database')
const { encryptedPassword } = require('../../config/plugins/encriptedPassword.plugin')

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
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM('client', 'employee'),
        allowNull: true,
        defaultValue: 'client'
    },

    status: {
        type: DataTypes.ENUM('available', 'disabled'),
        allowNull: false,
        defaultValue: 'available'
    }
}, {
    hooks: {
        beforeCreate: async(user) => {
            user.password = await encryptedPassword(user.password)
        }
    }
})

module.exports = Users