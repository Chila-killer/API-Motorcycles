const bcrypt = require('bcrypt')

exports.encryptedPassword = async(password) => {
    const salt = await bcrypt.genSalt(14)
    return await bcrypt.hash(password, salt)
}

exports.verifyPassword = async(bodyPassword, userPassword) => {
    return await bcrypt.compare(bodyPassword, userPassword)
}