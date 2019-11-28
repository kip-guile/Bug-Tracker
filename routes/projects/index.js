const router = require('express').Router()
const Functions = require('../../controllers/projects')
const middleware = require('../../middlewares/validation')

router.get('/', Functions.getProjects)
router.post('/', middleware.validateBody, Functions.addProjects)
router.put('/:id', middleware.validateBody, Functions.updateProject)
router.delete('/:id', Functions.deleteProject)

module.exports = router