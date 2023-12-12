const express = require('express')

const usersController = require('./users.controller')

const { validateExistUser, protect, protectAccountOwner, restrictTo } = require('./users.middleware')

const userRouter = express.Router()


userRouter.post('/', usersController.create)

userRouter.post('/login', usersController.login)

userRouter.use(protect)

userRouter.get('/', usersController.findAll)

userRouter
    .route('/:id')
    .get(restrictTo('employee'), validateExistUser, usersController.findOne)
    .patch(validateExistUser, protectAccountOwner, usersController.update)
    .delete(validateExistUser, protectAccountOwner, usersController.delete)


module.exports = userRouter