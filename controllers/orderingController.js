const { Order } = require('../models/models')
const ApiError = require('../error/ApiError')
const HelpFunction = require('./helpFunctions')

class OrderingController {
    async create(req, res, next) {
        const { payment, post, deliveryMethod, branchParcelMachine,
            name, family, phoneNumber, email,
            city, street, house, apatment,
            comments, userId, sendBill } = req.body

        const order = {
            payment, post, deliveryMethod, branchParcelMachine,
            name, family, phoneNumber, email,
            city, street, house, apatment,
            comments, userId, sendBill
        }
        try {
            const data = await Order.create(order)
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        const { id } = req.params
        const { order } = req.body
        try {
            const data = await Order.update(order, { where: { id } })
            return res.json({ "message": 'Обновление прошло успешно' })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async get(req, res, next) {
        const { id } = req.params
        try {
            const order = await Order.findByPk(id)
            return res.json(order)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        const { id } = req.params
        try {
            await Order.destroy({ where: { id } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAllGroup(req, res, next) {
        const { id } = req.params
        try {
            const data = await Order.findAndCountAll({ where: { userId: id } })
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteAllGroup(req, res, next) {
        const { id } = req.params
        try {
            await Order.destroy({ where: { userId: id } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

}

module.exports = new OrderingController()