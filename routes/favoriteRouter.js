const Router = require('express')
const router = new Router()
const favoriteController = require('../controllers/favoriteController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.get('/:id', favoriteController.getOne)
router.delete('/:id', checkRole('ADMIN'), favoriteController.delete)

module.exports = router