const { FavoriteDevice, Favorite, Device } = require('../models/models')
const ApiError = require('../error/ApiError')

class FavoriteDeviceController {
    async create(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const { id } = await Favorite.findOne({ where: { userId } })
            const favorite = await FavoriteDevice.findOne({ where: { favoriteId: id, deviceId } })
            if (favorite)
                return res.json({ 'message': 'Объект уже существует' })
            const data = await FavoriteDevice.create({ favoriteId: id, deviceId })
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }

    }

    async getOne(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const { id } = await Favorite.findOne({ where: { userId } })
            const data = await FavoriteDevice.findOne({ where: { favoriteId: id, deviceId } })
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const { userId } = req.params
            const { id } = await Favorite.findOne({ where: { userId } })
            const data = await FavoriteDevice.findAll({ where: { favoriteId: id } })
            let result = []
            for (let i = 0; i < data.length; i++) {
                const { dataValues } = await Device.findOne({ where: { id: data[i].dataValues.deviceId } })
                result.push(dataValues)
            }
            return res.json(result)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const { id } = await Favorite.findOne({ where: { userId } })
            const device = await FavoriteDevice.findOne({ where: { favoriteId: id, deviceId } })
            if (device)
                await FavoriteDevice.destroy({ where: { id } })
            return res.json({ "message": "Удаление прошло успешно" })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteGroup(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const { id } = await Favorite.findOne({ where: { userId } })
            await FavoriteDevice.destroy({ where: { favoriteId: id, deviceId } })
            return res.json({ "message": "Удаление прошло успешно" })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteAll(req, res, next) {
        try {
            const { userId } = req.params
            const { id } = await Favorite.findOne({ where: { userId } })
            await FavoriteDevice.destroy({ where: { favoriteId: id } })
            return res.json({ "message": "Удаление всех объектов прошло успешно" })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new FavoriteDeviceController()