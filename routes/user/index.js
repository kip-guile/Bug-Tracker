const express = require('express')
const router = express.Router()
const Functions = require('../../controllers/user')
const restricted = require('../../middlewares/restricted')


router.get('/', restricted, Functions.getUsers)
router.get('/:id', restricted, Functions.getUserById)

module.exports = router