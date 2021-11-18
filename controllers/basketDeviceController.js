const { BasketDevice, Basket, Device } = require('../models/models')
const ApiError = require('../error/ApiError')



class BasketDeviceController {
    async create(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const { id } = await Basket.findOne({ where: { userId } })
            if (!id)
                return next(ApiError.bedRequest({ 'message': ApiError.messageNotBasket }))
            const data = await BasketDevice.create({ basketId: id, deviceId })
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const { id } = await Basket.findOne({ where: { userId } })
            if (!id)
                return next(ApiError.bedRequest({ 'message': ApiError.messageNotBasket }))
            const basketDevice = await BasketDevice.findOne({ where: { basketId: id, deviceId } })
            return res.json(basketDevice)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const { userId } = req.params
            const { id } = await Basket.findOne({ where: { userId } })
            if (!id)
                return next(ApiError.bedRequest({ 'message': ApiError.messageNotBasket }))
            const data = await BasketDevice.findAll({ where: { basketId: id } })
            const map = new Map()
            for (let i = 0; i < data.length; i++) {
                if (!map.has(data[i].dataValues.deviceId)) {
                    map.set(data[i].dataValues.deviceId, 1)
                } else {
                    map.set(data[i].dataValues.deviceId, map.get(data[i].dataValues.deviceId) + 1)
                }
            }
            let result = []
            for (let key of map.keys()) {
                let dev = await Device.findOne({ where: { id: key } })
                result.push({ device: dev, count: map.get(key) })
            }
            let totalPrice = 0
            for (let i=0; i < result.length; i++) {
                totalPrice = totalPrice + result[i].device.price * result[i].count
            }
            return res.json({result, totalPrice})
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const { id } = await Basket.findOne({ where: { userId } })
            if (!id)
                return next(ApiError.bedRequest({ 'message': ApiError.messageNotBasket }))
            const device = await BasketDevice.findOne({ where: { basketId: id, deviceId } })
            if (device)
                await BasketDevice.destroy({ where: { id: device.id } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteGroup(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const { id } = await Basket.findOne({ where: { userId } })
            if (!id)
                return next(ApiError.bedRequest({ 'message': ApiError.messageNotBasket }))
            await BasketDevice.destroy({ where: { basketId: id, deviceId } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteAll(req, res, next) {
        try {
            const { userId } = req.params
            const { id } = await Basket.findOne({ where: { userId } })
            if (!id)
                return next(ApiError.bedRequest({ 'message': ApiError.messageNotBasket }))
            await BasketDevice.destroy({ where: { basketId: id } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new BasketDeviceController()