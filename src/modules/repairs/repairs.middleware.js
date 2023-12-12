const AppError = require("../../common/errors/appError");
const { catchAsync } = require("../../common/errors/catchAsync");
const RepairsServices = require("./repairs.services");

const validateExistRepair = catchAsync(async (req, res, next) => {
    const { id } = req.params
    
    const repair = await RepairsServices.findOne(id)

    if (!repair) {
        return next(new AppError(`Repair with id: ${id} not found`, 404))
    }
    req.repair = repair
    next() 
})

module.exports = validateExistRepair