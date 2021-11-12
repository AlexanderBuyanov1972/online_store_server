const { UserAddress } = require('../models/models')
const ApiError = require('../error/ApiError')
const HelpFunction = require('./helpFunctions')

class AddressController {
    async create(req, res, next) {
        const {
            nameRecipient,
            familyRecipient,
            phoneNumberRecipient,
            city,
            street,
            house,
            apatment,
            index,
            userId
        } = req.body
        try {
            const data = await UserAddress.create({
                nameRecipient,
                familyRecipient,
                phoneNumberRecipient,
                city,
                street,
                house,
                apatment,
                index,
                userId
            })
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        const { id } = req.params
        const { address } = req.body
        try {
            const data = await UserAddress.update(address, { where: { id } })
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async get(req, res, next) {
        const { id } = req.params
        try {
            const address = await UserAddress.findByPk(id)
            return res.json(address)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        const { id } = req.params
        try {
            await UserAddress.destroy({ where: { id } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAllGroup(req, res, next) {
        const { id } = req.params
        try {
            const data = await UserAddress.findAndCountAll({ where: { userId: id } })
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }



    async deleteAllGroup(req, res, next) {
        const { id } = req.params
        try {
            await UserAddress.destroy({ where: { userId: id } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAllAddresses(req, res, next) {
        const { id } = req.params
        try {
            const data = await UserAddress.findAndCountAll({ where: { userId: id } })
            return res.json(data)
        } catch (e) {
            return next(ApiError.bedRequest(e.message))
        }
    }

}

module.exports = new AddressController()