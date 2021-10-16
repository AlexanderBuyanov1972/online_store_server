const { Basket } = require('../models/models')
const ApiError = require('../error/ApiError')
const ErrorMessage = require('../error/ApiMessages')

class BasketController {

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const basket = await Basket.findOne({ where: { userId: id } })
            return res.json(basket)
        } catch (e) {
            next(ApiError.bedRequest(ErrorMessage.ERROR_OBJECT_IS_NOT_EXIST))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Basket.destroy({ where: { id: id } })
            return res.json({ "message": ErrorMessage.SUCCESSFUL_DELETION_WITH_DEFINED_ID })
        } catch (e) {
            next(ApiError.bedRequest(ErrorMessage.ERROR_OBJECT_IS_NOT_EXIST))
        }
    }
}

module.exports = new BasketController()