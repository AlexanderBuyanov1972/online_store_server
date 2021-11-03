const { Brand } = require('../models/models')
const ApiError = require('../error/ApiError')
const HelpFunction = require('./helpFunctions')

class BrandController {
    async create(req, res, next) {
        const { name } = req.body
        try {
            const data = await Brand.create({ name })
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        const { id } = req.params
        try {
            const brand = await Brand.update(req.body, { where: { id: id } })
            return res.json(brand)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res, next) {
        const { id } = req.params
        try {
            const brand = await Brand.findByPk(id)
            return res.json(brand)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll()
            return res.json(HelpFunction.arraySort(brands, 'All brands'))
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        const { id } = req.params
        try {
            await Brand.destroy({ where: { id: id } })
            return res.json({ "message": "Удаление прошло успешно" })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteAll(req, res, next) {
        try {
            await Brand.destroy()
            return res.json({ "message": "Удаление прошло успешно" })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

}

module.exports = new BrandController()