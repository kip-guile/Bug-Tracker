const router = require('express').Router()
const Functions = require('../../controllers/bugs')
const middleware = require('../../middlewares/validation')
const authCheck = require('../../middlewares/restricted')

router.get('/', authCheck, Functions.getBugs)
router.post('/', authCheck, middleware.validateBody, Functions.addBug)
router.get('/:id', authCheck, middleware.validateBugById, Functions.getBugById)
router.patch('/assigned', authCheck, middleware.validateBody, Functions.getBugByDevId )

module.exports = router