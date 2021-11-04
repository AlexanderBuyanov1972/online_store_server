const { Favorite } = require('../models/models')
const ApiError = require('../error/ApiError')

class FavoriteController {

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const favorite = await Favorite.findOne({ where: { userId: id } })
            return res.json(favorite)
        } catch (e) {
            return next(ApiError.bedRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Favorite.destroy({ where: { id: id } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.bedRequest(e.message))
        }
    }
}

module.exports = new FavoriteController()