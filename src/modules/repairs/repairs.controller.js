const { catchAsync } = require('../../common/errors/catchAsync')
const RepairsServices = require('./repairs.services')
const { validateRepair } = require('./repairs.schema')

exports.findAll = catchAsync(async (req, res) => {

    const repairs = await RepairsServices.findAll()

    return res.status(200).json({
        message: "method get - findAll: from repairs",
        data: repairs
    })

})

exports.create = catchAsync(async (req, res) => {
    const { date, motorsNumber, description, userId } = validateRepair(req.body)

    const repair = await RepairsServices.create({ date, motorsNumber, description, userId })

    return res.status(201).json({
        message: "method post - create: from repairs",
        data: repair
    })
})

exports.findOne = catchAsync(async (req, res) => {
    const { id } = req.params

    const repair = await RepairsServices.findOne(id)

    return res.status(200).json({
        message: "method get - findOne: from repairs",
        data: repair
    })

})

exports.update = catchAsync(async (req, res) => {
    const { id } = req.params

    const repair = await RepairsServices.findOne(id)

    const updateRepair = await RepairsServices.update(repair)

    return res.status(200).json({
        message: "method patch - update: from repairs",
        updateRepair
    })
})

exports.delete = catchAsync(async (req, res) => {
    const { id } = req.params

    const repair = await RepairsServices.findOne(id)

    await RepairsServices.delete(repair)

    return res.status(204).json(null)
})