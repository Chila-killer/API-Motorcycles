const AppError = require('../../common/errors/appError')
const { catchAsync } = require('../../common/errors/catchAsync')
const UsersServices = require('./users.services')
const { envs } = require('../../config/environments/environments')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const validateExistUser = catchAsync(async ( req, res, next) => {
    const { id } = req.params

    const user = await UsersServices.findOne(id)

    if(!user) {
        return next(new AppError(`User with id: ${id} not found`, 404))
    }

    req.user = user
    next()
})

const protect = catchAsync(async(req, res, next) => {
    let token

    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) 
    {
        token= req.headers.authorization.split(' ')[1]   
    }

    if (!token) {
        return next( new AppError('You are not logged in!. Please login to get access', 401))
    }

    const decoded = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED)

    const user = await UsersServices.findOne(decoded.id)

    if (!user) {
        return next(
          new AppError('The owner of this token is not longer available', 401)
        )
    }

    if (user.passwordChangedAt) {
        const changedTimeStamp = parseInt
        (
          user.passwordChangedAt.getTime() / 1000,
          10
        )
    
        if (decoded.iat < changedTimeStamp) {
          return next(
            new AppError('User recently changed password!, please login again.', 401)
          )
        }
    }

    req.sessionUser = user
    next()
})

const protectAccountOwner = (req, res, next) => {
    const { user, sessionUser } = req
  
    if (user.id !== sessionUser.id) {
      return next(new AppError('You do not own this account', 401))
    }
  
    next()
}

const restrictTo = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.sessionUser.role)) {
        return next(
          new AppError('You do not have permission to perform this action', 403)
        );
      }
      next();
    };
  };

module.exports = {
    validateExistUser,
    protect, 
    protectAccountOwner,
    restrictTo
}