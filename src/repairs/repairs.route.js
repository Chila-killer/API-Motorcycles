const express = require('express')

const repairsController = require('./repairs.controller')

const router = express.Router()

router.get('/repairs', repairsController.findAll)

router.get('/repairs/:id', repairsController.findOne)

router.post('/repairs', repairsController.create)

router.patch('/repairs/:id', repairsController.update)

router.delete('/repairs/:id', repairsController.delete)

module.exports = router