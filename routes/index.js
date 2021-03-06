const Router = require('express')
const deviceRouter = require('./deviceRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const favoriteRouter = require('./favoriteRouter')
const basketDeviceRouter = require('./basketDeviceRouter')
const favoriteDeviceRouter = require('./favoriteDeviceRouter')
const photoRouter = require('./photoRouter')
const addressRouter = require('./addressRouter')
const authRouter = require('./authRouter')
const orderingRouter = require('./orderingRouter')

const router = new Router()
router.use('/user', userRouter)
router.use('/auth', authRouter)
router.use('/address', addressRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)
router.use('/favorite', favoriteRouter)
router.use('/basket_device', basketDeviceRouter)
router.use('/favorite_device', favoriteDeviceRouter)
router.use('/photo', photoRouter)
router.use('/ordering', orderingRouter)

module.exports = router