const { catchAsync } = require('../../common/errors/catchAsync')
const UserServices = require('./users.services')
const { validateUser, validateLogin } = require('./users.schema')
const AppError = require('../../common/errors/appError')
const { verifyPassword } = require('../../config/plugins/encriptedPassword.plugin')
const { generateJWT } = require('../../config/plugins/generateJwt.plugin')

exports.findAll = catchAsync(async (req, res) => {
    const users = await UserServices.findAll()

    return res.status(200).json({
        message: "method get - findAll: from users",
        data: users
    })
})

exports.create = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, userData } = validateUser(req.body)

    const emailUser = UserServices.validateEmail(userData.email)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        })
    }

    if (emailUser) {
        return next(new AppError(`User with email: ${userData.email} already exists`, 409))
    }


    const user = await UserServices.create(userData)

    const token = await generateJWT(user.id)

    return res.status(201).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            photo: user.photo,
        }
    })
})

exports.login = catchAsync(async (req, res, next) => {
    const { hasError, errorMessages, userData } = validateLogin(req.body)

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: errorMessages,
        })
    }

    const user = await UserServices.validateEmail(userData.email)

    if (!user) {
        return next(new AppError('This account does not exist', 404))
    }

    const isCorrectPassword = await verifyPassword(
        userData.password,
        user.password
    )

    if (!isCorrectPassword) {
        return next(new AppError('Incorrect email or password', 401))
    }

    const token = await generateJWT(user.id)

    return res.status(200).json({
        token,
        message: "method get - findOne: from users",
        user: {
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            photo: user.photo,
        }
    })
})

exports.findOne = catchAsync(async (req, res) => {
    const { id } = req.params

    const user = await UserServices.findOne(id)

    return res.status(200).json({
        message: "method get - findOne: from users",
        data: user
    })
})

exports.update = catchAsync(async (req, res) => {
    const { id } = req.params
    const { name, email } = req.body

    const user = await UserServices.findOne(id)

    const updateUser = await UserServices.update(user, { name, email })

    return res.status(200).json({
        message: "method patch - update: from users",
        updateUser
    })
})

exports.delete = catchAsync(async (req, res) => {
    const { id } = req.params

    const user = await UserServices.findOne(id)

    await UserServices.delete(user)

    return res.status(204).json(null)
})