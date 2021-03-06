const express = require('express')
const router = express.Router()
const authRoutes = require('./auth')
const userRoutes = require('./user')
const projectRoutes = require('./projects')
const bugRoutes = require('./bugs')
const unassignedBugRoutes = require('./bugs/unassigned')

router.get('/', (req, res) => res.status(200).json('Welcome'))
router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/projects', projectRoutes)
router.use('/bugs', bugRoutes)
router.use('/unassigned', unassignedBugRoutes)

module.exports = router