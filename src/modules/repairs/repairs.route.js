const express = require('express')

const repairsController = require('./repairs.controller')
const validateExistRepair = require('./repairs.middleware')

const { restrictTo } = require('../users/users.middleware')

const repairRouter = express.Router()

repairRouter.get('/', restrictTo('employee'), repairsController.findAll)

repairRouter.post('/', repairsController.create)

repairRouter
    .route('/:id')
    .get(validateExistRepair, restrictTo('employee'), repairsController.findOne)
    .patch(validateExistRepair, restrictTo('employee'), repairsController.update)
    .delete(validateExistRepair, restrictTo('employee'), repairsController.delete)

module.exports = repairRouter