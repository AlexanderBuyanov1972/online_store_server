const Router = require('express')
const router = new Router()
const brandController = require('../controllers/brandController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), brandController.create)
router.put('/:id', checkRole('ADMIN'), brandController.update)
router.get('/:id', checkRole('ADMIN'), brandController.getOne)
router.get('/', brandController.getAll)
router.delete('/:id', checkRole('ADMIN'), brandController.delete)
router.delete('/', checkRole('ADMIN'), brandController.deleteAll)

module.exports = router
