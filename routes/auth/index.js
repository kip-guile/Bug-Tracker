const router = require('express').Router();
const Functions = require('../../controllers/user')

router.post('/register', Functions.register)
router.post('/login', Functions.login)

module.exports = router