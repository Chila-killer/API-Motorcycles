const UserServices = require('./users.services')

exports.findAll = async (req, res) => {
    try {
        const { requestTime } = req
        const users = await UserServices.findAll()

        return res.status(200).json({
            message: "method get - findAll: from users",
            requestTime,
            data: users
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went wrong',
            error
        })
    }
}

exports.create = async (req, res) => {
    try {
        const { requestTime } = req
        const { name, email, password, role } = req.body

        const emailUser = await UserServices.validateEmail(email)

        if (emailUser){
            return res.status(500).json({
                status: 'invalid request',
                message: `User with email: ${email} already exists`
            })
        }

        const user = await UserServices.create({
            name,
            email,
            password,
            role
        })

        return res.status(201).json({
            message: "method post - create: from users",
            requestTime,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went wrong',
            error
        })
    }
}

exports.findOne = async (req, res) => {
    try {
        const { requestTime } = req
        const { id } = req.params

        const user = await UserServices.findOne(id)

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User with id: ${id} not found`
            })
        }

        return res.status(200).json({
            message: "method get - findOne: from users",
            requestTime,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went wrong',
            error
        })
    }
}

exports.update = async (req, res) => {
    try {
        const { requestTime } = req
        const { id } = req.params
        const { name, email } = req.body

        const user = await UserServices.findOne(id)

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User with id: ${id} not found`
            })
        }

        const updateUser = await UserServices.update(user, { name, email })

        return res.status(200).json({
            message: "method patch - update: from users",
            requestTime,
            updateUser
        })
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went wrong',
            error
        })
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params

        const user = await UserServices.findOne(id)

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: `User with id: ${id} not found`
            })
        }

        await UserServices.delete(user)

        return res.status(204).json(null)
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went wrong',
            error
        })
    }
}