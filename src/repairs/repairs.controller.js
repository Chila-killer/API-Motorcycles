const RepairsServices = require('./repairs.services')

exports.findAll = async (req, res) => {
    try {
        const { requestTime } = req

        const repairs = await RepairsServices.findAll()

        return res.status(200).json({
            message: "method get - findAll: from repairs",
            requestTime,
            data: repairs
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
        const { date, userId } = req.body

        const repair = await RepairsServices.create({ date, userId })

        return res.status(201).json({
            message: "method post - create: from repairs",
            requestTime,
            data: repair
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

        const repair = await RepairsServices.findOne(id)

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Repair with id: ${id} not found`
            })
        }

        if (repair.status !== 'pending'){
            return res.status(404).json({
                status: 'query error',
                message: `Repair with id: ${id} is either cancelled or completed`
            })
        }

        return res.status(200).json({
            message: "method get - findOne: from repairs",
            requestTime,
            data: repair
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

        const repair = await RepairsServices.findOne(id)

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Repair with id: ${id} not found`
            })
        }

        if (repair.status !== 'pending'){
            return res.status(404).json({
                status: 'query error',
                message: `Repair with id: ${id} is either cancelled or already completed`
            })
        }

        const updateRepair = await RepairsServices.update(repair)

        return res.status(200).json({
            message: "method patch - update: from repairs",
            requestTime,
            updateRepair
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

        const repair = await RepairsServices.findOne(id)

        if (!repair) {
            return res.status(404).json({
                status: 'error',
                message: `Repair with id: ${id} not found`
            })
        }

        if (repair.status !== 'pending'){
            return res.status(404).json({
                status: 'query error',
                message: `Repair with id: ${id} is either already cancelled or completed`
            })
        }

        await RepairsServices.delete(repair)

        return res.status(204).json(null)
    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went wrong',
            error
        })
    }
}