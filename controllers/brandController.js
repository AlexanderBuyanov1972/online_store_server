const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')
const HelpFunction = require('./helpFunctions')
const {
    ERROR_OBJECT_IS_NOT_CREATE,
    ERROR_OBJECT_IS_NOT_UPDATE,
    ERROR_OBJECT_IS_NOT_EXIST,
    ERROR_DATA_IS_NOT_RECEIVED,
    ERROR_DATA_IS_NOT_DELETED,
    SUCCESSFUL_DELETION,
    SUCCESSFUL_DELETION_WITH_DEFINED_ID
} = require('../error/ApiMessages')

class BrandController {
    async create(req, res, next) {
        const { name } = req.body
        Brand.create({ name }).then((data) => {
            return res.json(data)
        }).catch((err) => {
            return res.json(next(ApiError.internal(ERROR_OBJECT_IS_NOT_CREATE)))
        })
    }

    async update(req, res, next) {
        try {
            const { id } = req.params
            const brand = await Brand.update(req.body, {
                where: { id: id }
            })
            return res.json(brand)
        } catch (e) {
            next(ApiError.internal(ERROR_OBJECT_IS_NOT_UPDATE))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const brand = await Brand.findByPk(id)
            return res.json(brand)
        } catch (e) {
            next(ApiError.bedRequest(ERROR_OBJECT_IS_NOT_EXIST))
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll()
            const value = 'All brands'
            return res.json(HelpFunction.arraySort(brands, value))
        } catch (e) {
            next(ApiError.internal(ERROR_DATA_IS_NOT_RECEIVED))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Brand.destroy({ where: { id: id } })
            return res.json({ "message": SUCCESSFUL_DELETION_WITH_DEFINED_ID })
        } catch (e) {
            next(ApiError.bedRequest(ERROR_OBJECT_IS_NOT_EXIST))
        }
    }

    async deleteAll(req, res, next) {
        try {
            await Brand.destroy()
            return res.json({ "message": SUCCESSFUL_DELETION })
        } catch (e) {
            next(ApiError.internal(ERROR_DATA_IS_NOT_DELETED))
        }
    }

}

module.exports = new BrandController()