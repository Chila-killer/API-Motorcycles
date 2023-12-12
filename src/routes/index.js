const express = require('express')
const userRouter = require('../modules/users/users.route')
const repairRouter = require('../modules/repairs/repairs.route');
const { protect } = require('../modules/users/users.middleware');

const router = express.Router()

router.use('/users', userRouter);
router.use(protect);
router.use('/repairs', repairRouter);

module.exports = router
