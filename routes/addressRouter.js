const Router = require('express')
const router = new Router()
const addressController = require('../controllers/addressController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', addressController.create)
router.put('/:id', authMiddleware, addressController.update)
router.get('/:id', authMiddleware, addressController.get)
router.delete('/:id', authMiddleware, addressController.delete)
router.get('/group/:id', authMiddleware, addressController.getAllGroup)
router.delete('/group/:id', authMiddleware, addressController.deleteAllGroup)
router.get('/:id_old/:id_new', authMiddleware, addressController.replaceAddressDefault)

module.exports = router