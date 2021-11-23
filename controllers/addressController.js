const { UserAddress } = require('../models/models')
const ApiError = require('../error/ApiError')
const HelpFunction = require('./helpFunctions')

class AddressController {
    async create(req, res, next) {
        const { nameRecipient, familyRecipient, phoneNumberRecipient, emailRecipient,
            city, street, house, apatment, index, isDefault, userId } = req.body

        try {
            if (isDefault === true) {
                const data = await UserAddress.findAll({ where: { userId } })
                data.forEach(el => {
                    el.isDefaul = false
                    UserAddress.update(el, el.id)
                })
            }
            const data = await UserAddress.create({
                nameRecipient, familyRecipient, phoneNumberRecipient, emailRecipient,
                city, street, house, apatment, index, isDefault, userId
            })
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        const { id } = req.params
        const { nameRecipient, familyRecipient, phoneNumberRecipient, emailRecipient,
            city, street, house, apatment, index, isDefault, userId } = req.body
        try {
            if (isDefault === true) {
                const data = await UserAddress.findAll({ where: { userId } })
                data.forEach(el => {
                    el.isDefaul = false
                    UserAddress.update(el, el.id)
                })
            }
            const data = await UserAddress.update({
                nameRecipient, familyRecipient, phoneNumberRecipient, emailRecipient,
                city, street, house, apatment, index, isDefault, userId
            }, { where: { id } })
            return res.json({ "message": 'Обновление прошло успешно' })
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
            return res.json(HelpFunction.sortFindAndCountAll(data, 'familyRecipient', 'isDefault', true))
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

    async replaceAddressDefault(req, res, next) {
        const { id_old, id_new } = req.params

        try {

            const address_old = await UserAddress.findByPk(id_old)
            address_old.dataValues.isDefault = false
            await UserAddress.update(address_old.dataValues, { where: { id: id_old } })

            const address_new = await UserAddress.findByPk(id_new)
            address_new.dataValues.isDefault = true
            await UserAddress.update(address_new.dataValues, { where: { id: id_new } })

            return res.json({ "message": 'Обновление прошло успешно' })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

}

module.exports = new AddressController()