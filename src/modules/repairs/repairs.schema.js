const z = require('zod')
const { extractValidationData } = require('../../common/utils/exctractErrorData')

const repairSchema = z.object({
    date: z.coerce.date(),
    motorsNumber: z.string().min(7).max(15),
    description: z.string().min(10),
    userId: z.string()
})

const validateRepair = function (data) {
    const result = repairSchema.safeParse(data)

    const { hasError, errorMessages, data: repairData } = extractValidationData(result)

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