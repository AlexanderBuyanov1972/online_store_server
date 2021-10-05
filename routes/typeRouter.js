const Router = require('express')
const router = new Router()
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create)
router.put('/:id', checkRole('ADMIN'), typeController.update)
router.get('/:id', checkRole('ADMIN'), typeController.getOne)
router.get('/', typeController.getAll)
router.delete('/:id', checkRole('ADMIN'), typeController.delete)
router.delete('/', checkRole('ADMIN'), typeController.deleteAll)

module.exports = router