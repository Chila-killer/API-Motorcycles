const Users = require("../../modules/users/users.model")
const Repairs = require("../../modules/repairs/repairs.model")

exports.initModel = () => {
     
    Users.hasMany(Repairs, { foreignKey: "userId" })
    Repairs.belongsTo(Users, { foreignKey: "userId" })

}