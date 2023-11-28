const express = require('express')

const usersController = require('./users.controller')

const router = express.Router()

router.get('/users', usersController.findAll)

router.get('/users/:id', usersController.findOne)

router.post('/users', usersController.create)

router.patch('/users/:id', usersController.update)

router.delete('/users/:id', usersController.delete)

module.exports = router