const Router = require('express')
const router = new Router()
const photoController = require('../controllers/photoController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), photoController.create)
router.put('/:id', checkRole('ADMIN'), photoController.update)
router.get('/:id', checkRole('ADMIN'), photoController.getOne)
router.get('/group/:group', photoController.getGroup)
router.get('/', photoController.getAll)
router.delete('/:id', checkRole('ADMIN'), photoController.delete)
router.delete('/group/:group', checkRole('ADMIN'), photoController.deleteGroup)
router.delete('/', checkRole('ADMIN'), photoController.deleteAll)

module.exports = router