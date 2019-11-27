const express = require('express')
const router = express.Router()
const Functions = require('../../controllers/user')
const restricted = require('../../middlewares/restricted')


router.get('/', restricted, Functions.getUsers)
router.get('/profile')

module.exports = router