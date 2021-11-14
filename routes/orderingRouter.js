const Router = require('express')
const router = new Router()
const orderingController = require('../controllers/orderingController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, orderingController.create)
router.put('/:id', authMiddleware, orderingController.update)
router.get('/:id', authMiddleware, orderingController.get)
router.delete('/:id', authMiddleware, orderingController.delete)
router.get('/group/:id', authMiddleware, orderingController.getAllGroup)
router.delete('/group/:id', authMiddleware, orderingController.deleteAllGroup)

module.exports = router