const jwt = require('jsonwebtoken')
const { envs } = require('../environments/environments')

exports.generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id }

        jwt.sign(
            payload,
            envs.SECRET_JWT_SEED,
            {
                expiresIn: envs.JWT_EXPIRE_IN,
            },
            (err, token) => {
                if (err) reject(err);

                resolve(token);
            }
        )
    })
}