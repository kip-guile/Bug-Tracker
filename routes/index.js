const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')

router.get('/', (req, res) => res.status(200).json('Welcome'))
router.use('/auth', authRoutes)

module.exports = router