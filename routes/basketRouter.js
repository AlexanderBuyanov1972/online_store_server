const Router = require('express')
const router = new Router()
const basketController = require('../controllers/basketController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.get('/:id', basketController.getOne)
router.delete('/:id', checkRole('ADMIN'), basketController.delete)

module.exports = router