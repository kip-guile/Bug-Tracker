const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const userRoutes = require('./user')

router.get('/', (req, res) => res.status(200).json('Welcome'))
router.use('/auth', authRoutes)
router.use('/users', userRoutes)

module.exports = router