const { Basket } = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const basket = await Basket.findOne({ where: { userId: id } })
            return res.json(basket)
        } catch (e) {
            return next(ApiError.bedRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Basket.destroy({ where: { id: id } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.bedRequest(e.message))
        }
    }
}

module.exports = new BasketController()