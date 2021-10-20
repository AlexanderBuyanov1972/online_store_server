const Router = require('express')
const router = new Router()
const basketDeviceController = require('../controllers/basketDeviceController')
const checkRole = require("../middleware/checkRoleMiddleware");

router.post('/:userId/:deviceId', basketDeviceController.create)
router.get('/:userId/:deviceId', basketDeviceController.getOne)
router.get( '/:userId', basketDeviceController.getAll)
router.delete('/:userId/:deviceId',  basketDeviceController.delete)
router.delete('/group/:userId/:deviceId',  basketDeviceController.deleteGroup)
router.delete('/:userId',  basketDeviceController.deleteAll)

module.exports = router