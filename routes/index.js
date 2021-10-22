const Router = require('express')
const deviceRouter = require('./deviceRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')
const basketDeviceRouter = require('./basketDeviceRouter')
const photoRouter = require('./photoRouter')

const router = new Router()
router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', basketRouter)
router.use('/basket_device', basketDeviceRouter)
router.use('/photo', photoRouter)

module.exports = router