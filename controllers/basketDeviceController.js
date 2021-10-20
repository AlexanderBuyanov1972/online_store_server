const { BasketDevice, Basket, Device } = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketDeviceController {
    async create(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const basket = await Basket.findOne({ where: { userId } })
            const data = await BasketDevice.create({ basketId: basket.dataValues.id, deviceId })
            return res.json(data)
        } catch (e) {
            next(ApiError.internal(e.message))
        }

    }

    async getOne(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const basket = await Basket.findOne({ where: { userId } })
            const basketDevice = await BasketDevice.findOne({
                where: {
                    basketId: basket.dataValues.id,
                    deviceId
                }
            })
            return res.json(basketDevice)
        } catch (e) {
            next(ApiError.bedRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const { userId } = req.params
            const basket = await Basket.findOne({ where: { userId } })
            const data = await BasketDevice.findAll({
                where: {
                    basketId: basket.dataValues.id
                }
            })

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
                const dev = await Device.findOne({ where: { id: key } })
                result.push({ device: dev, count: map.get(key) })
            }

            return res.json(result)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const basket = await Basket.findOne({ where: { userId } })
            const basketDevice = await BasketDevice.findOne({
                where: { basketId: basket.dataValues.id, deviceId }
            })
            if (basketDevice) {
                await BasketDevice.destroy({
                    where: { id: basketDevice.id }
                })
            }

            return res.json({ "message": "Удаление прошло успешно" })
        } catch (e) {
            next(ApiError.bedRequest(e.message))
        }
    }

    async deleteGroup(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const basket = await Basket.findOne({ where: { userId } })
            const data = await BasketDevice.destroy({
                where: {
                    basketId: basket.dataValues.id,
                    deviceId
                }
            })
            return res.json({ "message": "Удаление прошло успешно" })
        } catch (e) {
            return res.json(e.message)
        }
    }

    async deleteAll(req, res, next) {
        try {
            const { userId } = req.params
            const basket = await Basket.findOne({ where: { userId } })
            await BasketDevice.destroy({
                where: {
                    basketId: basket.dataValues.id
                }
            })
            return res.json({ "message":"Удаление всех объектов прошло успешно" })
        } catch (e) {
            next(ApiError.bedRequest(ErrorMessage.ERROR_OBJECT_IS_NOT_EXIST))
        }
    }

}

module.exports = new BasketDeviceController()