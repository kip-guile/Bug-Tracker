const router = require('express').Router()
const Functions = require('../../controllers/projects')
const middleware = require('../../middlewares/validation')
const authCheck = require('../../middlewares/restricted')

router.get('/', authCheck, Functions.getProjects)
router.post('/', authCheck, middleware.validateBody, Functions.addProjects)
router.put('/:id', authCheck, middleware.validateBody, Functions.updateProject)
router.delete('/:id', authCheck, Functions.deleteProject)

module.exports = router