const router = require('express').Router()
const Functions = require('../../controllers/bugs')
// const middleware = require('../../middlewares/validation')
const authCheck = require('../../middlewares/restricted')

router.get('/', authCheck, Functions.getBugs)

module.exports = router