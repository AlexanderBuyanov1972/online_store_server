const { FavoriteDevice, Favorite, Device } = require('../models/models')
const ApiError = require('../error/ApiError')



class FavoriteDeviceController {
    async create(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const { id } = await Favorite.findOne({ where: { userId } })
            if (!id)
                return next(ApiError.bedRequest({ 'message': ApiError.messageNotFavorite }))
            const favorite = await FavoriteDevice.findOne({ where: { favoriteId: id, deviceId } })
            if (favorite)
                return next(ApiError.bedRequest({ 'message': ApiError.messageAlreadyExists }))
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
            if (!id)
                return next(ApiError.bedRequest({ 'message': ApiError.messageNotFavorite }))
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
            if (!id)
                return next(ApiError.bedRequest({ 'message': ApiError.messageNotFavorite }))
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
            if (!id)
                return next(ApiError.bedRequest({ 'message': ApiError.messageNotFavorite }))
            const device = await FavoriteDevice.findOne({ where: { favoriteId: id, deviceId } })
            if (device) {
                const result = await FavoriteDevice.destroy({ where: { id: device.id } })
                return res.json(result)
            }
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteGroup(req, res, next) {
        try {
            const { userId, deviceId } = req.params
            const { id } = await Favorite.findOne({ where: { userId } })
            if (!id)
                return next(ApiError.bedRequest({ 'message': ApiError.messageNotFavorite }))
            await FavoriteDevice.destroy({ where: { favoriteId: id, deviceId } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteAll(req, res, next) {
        try {
            const { userId } = req.params
            const { id } = await Favorite.findOne({ where: { userId } })
            if (!id)
                return next(ApiError.bedRequest({ 'message': ApiError.messageNotFavorite }))
            await FavoriteDevice.destroy({ where: { favoriteId: id } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new FavoriteDeviceController()