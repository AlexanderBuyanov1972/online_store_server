const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), deviceController.create)
router.put('/:id', checkRole('ADMIN'), deviceController.update)
router.get('/:id', deviceController.getOne)
router.get('/', deviceController.getAll)
router.delete('/:id', checkRole('ADMIN'), deviceController.delete)
router.delete('/', checkRole('ADMIN'), deviceController.deleteAll)

module.exports = router

