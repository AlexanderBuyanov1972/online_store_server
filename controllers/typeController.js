const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')
const HelpFunction = require('./helpFunctions')
const { arraySort } = require('./helpFunctions')


class TypeController {
    async create(req, res) {
        const { name } = req.body
        try {
            const data = await Type.create({ name })
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async update(req, res) {
        const { id } = req.params
        try {
            const data = await Type.update(req.body, { where: { id: id } })
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // get one object by id
    async getOne(req, res, next) {
        const { id } = req.params
        try {
            const data = await Type.findByPk(id)
            return res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }

    }

    // get all sorted objects
    async getAll(req, res, next) {
        try {
            const types = await Type.findAll()
            return res.json(HelpFunction.arraySort(types, 'Все типы'))
        } catch (e) {
            return next(ApiError.internal(e.message))
        }

    }

    // delete one object by id
    async delete(req, res, next) {
        const { id } = req.params
        try {
            await Type.destroy({ where: { id: id } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }

    }

    // delete all objects
    async deleteAll(req, res, next) {
        try {
            await Type.destroy()
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

}

module.exports = new TypeController()