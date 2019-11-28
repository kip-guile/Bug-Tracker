const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const userRoutes = require('./user')
const projectRoutes = require('./projects')

router.get('/', (req, res) => res.status(200).json('Welcome'))
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/projects', projectRoutes)

module.exports = router