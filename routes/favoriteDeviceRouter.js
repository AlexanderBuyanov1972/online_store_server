const Router = require('express')
const router = new Router()
const favoriteDeviceController = require('../controllers/favoriteDeviceController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/:userId/:deviceId', favoriteDeviceController.create)
router.get('/:userId/:deviceId', favoriteDeviceController.getOne)
router.get( '/:userId', favoriteDeviceController.getAll)
router.delete('/:userId/:deviceId',  favoriteDeviceController.delete)
router.delete('/group/:userId/:deviceId',  favoriteDeviceController.deleteGroup)
router.delete('/:userId',  favoriteDeviceController.deleteAll)

module.exports = router