const z = require('zod')
const { extractValidationData } = require('../../common/utils/exctractErrorData')

const registerSchema = z.object({
    name: z.string({invalid_type_error: 'name must be a string', required_error: 'name is required'})
      .min(3, { message: 'name is too short' })
      .max(50, { message: 'name is too long' }),
    email: z.string().email({ message: 'Invalid e-mail'}),
    password: z.string().min(8, { message: 'Password must be at least 8 characters'})
})

const loginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, { message: 'Password is too long' }),
})

const validateUser = (data) => {
    const result = registerSchema.safeParse(data);
  
    const {
      hasError,
      errorMessages,
      data: userData
    } = extractValidationData(result);

    return {
      hasError,
      errorMessages,
      userData,
    };
  }

  const validateLogin = (data) => {
    const result = loginUserSchema.safeParse(data);
  
    const {
      hasError,
      errorMessages,
      data: userData,
    } = extractValidationData(result);
  
    return {
      hasError,
      errorMessages,
      userData,
    };
  }

module.exports = {
    validateUser,
    validateLogin
}