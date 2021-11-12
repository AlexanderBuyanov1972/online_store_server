const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', userController.create)
router.put('/:id', authMiddleware, userController.update)
router.get('/:id', authMiddleware, userController.get)
router.delete('/:id', authMiddleware, userController.delete)

module.exports = router