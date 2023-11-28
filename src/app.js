const express = require('express')

const users = require('./users/users.route')
const repairs = require('./repairs/repairs.route')

const {requestTime} = require('./common/middlewares')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestTime)

app.use('/api/v1', users, repairs)

module.exports = app