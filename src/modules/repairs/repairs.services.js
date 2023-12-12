const { where } = require('sequelize')

const Repairs = require('./repairs.model')

class RepairsServices {
    static async findAll() {
        return await Repairs.findAll({
            where: {
                status: 'pending'
            }
        })
    }

    static async create( data ) {
        return await Repairs.create(data)
    }

    static async findOne(id) {
        return await Repairs.findOne({
            where: {
                id,
            status: 'pending'
            }
        })
    }

    static async update(repair) {
        return await repair.update({
            status: 'completed'
        })
    }

    static async delete(repair) {
        return await repair.update({
            status: 'cancelled'
        })
    }
}

module.exports = RepairsServices