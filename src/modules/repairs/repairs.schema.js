const z = require('zod')
const exctractValidationData = require('../../common/utils/exctractErrorData')

const repairSchema = z.object({
    date: z.date(),
    motorsNumber: z.string().min(7).max(15),
    description: z.string().min(10)
})

const validateRepair = function (data) {
    const result = repairSchema.safeParse(data)

    const { hasError, errorMessages, data: repairData } = exctractValidationData(result)

    return {
        hasError,
        errorMessages,
        repairData
    }
}

module.exports = {
    repairSchema,
    validateRepair
}