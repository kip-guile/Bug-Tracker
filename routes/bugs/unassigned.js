const router = require('express').Router()
const Functions = require('../../controllers/bugs')
const middleware = require('../../middlewares/validation')
const authCheck = require('../../middlewares/restricted')

router.get('/', authCheck, Functions.getUnassignedBugs)
router.get('/:id', authCheck, middleware.validateBugById, Functions.getUnassignedBugsById)

module.exports = router