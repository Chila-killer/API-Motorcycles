const express = require('express')

const router = require('./routes/index')
const { envs } = require('./config/environments/environments')
const { globalErrorHandler } = require('./common/errors/error.controller')
const morgan = require('morgan')

const { enableCors } = require('./config/plugins/cors.plugin')

const app = express()

const ACCEPTED_ORIGINS = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

enableCors(app, ACCEPTED_ORIGINS);

if (envs.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use('/api/v1', router)

app.all('*', (req, res, next) => {
    return next(
      new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
    )
  })

app.use(globalErrorHandler);

module.exports = app