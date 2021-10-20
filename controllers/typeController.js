const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')
const HelpFunction = require('./helpFunctions')
const { arraySort } = require('./helpFunctions')


class TypeController {
    async create(req, res) {
        const { name } = req.body
        Type.create({ name }).then((data) => {
            return res.json(data)
        }).catch((err) => {
            return res.json({ message: err.message })
        })

    }

    async update(req, res) {
        const { id } = req.params
        Type.update(req.body, {
            where: { id: id }
        }).then(() => res.json({ message: '' })).catch((err) => {
            return res.json({ message: err.message })
        })
    }

    // get one object by id
    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const type = await Type.findByPk(id)
            return res.json(type)
        } catch (e) {
            next(ApiError.bedRequest(ERROR_OBJECT_IS_NOT_EXIST))
        }

    }

    // get all sorted objects
    async getAll(req, res, next) {
        try {
            const types = await Type.findAll()
            const value = 'Все типы'
            return res.json(HelpFunction.arraySort(types, value))
        } catch (e) {
            next(ApiError.internal(ERROR_DATA_IS_NOT_RECEIVED))
        }

    }

    arraySort = (array, value, compare) => {

        return
    }

    // delete one object by id
    async delete(req, res, next) {
        try {
            const { id } = req.params
            await Type.destroy({ where: { id: id } })
            return res.json({ "message": SUCCESSFUL_DELETION_WITH_DEFINED_ID })
        } catch (e) {
            next(ApiError.bedRequest(ERROR_OBJECT_IS_NOT_EXIST))
        }

    }

    // delete all objects
    async deleteAll(req, res, next) {
        try {
            await Type.destroy()
            return res.json({ "message": SUCCESSFUL_DELETION })
        } catch (e) {
            next(ApiError.internal(ERROR_DATA_IS_NOT_DELETED))
        }
    }

}

module.exports = new TypeController()