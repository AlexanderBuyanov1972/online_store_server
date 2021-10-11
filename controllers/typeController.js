const { Type } = require('../models/models')
const ApiError = require('../error/ApiError')
const {
    ERROR_OBJECT_IS_NOT_CREATE,
    ERROR_OBJECT_IS_NOT_UPDATE,
    ERROR_OBJECT_IS_NOT_EXIST,
    ERROR_DATA_IS_NOT_RECEIVED,
    ERROR_DATA_IS_NOT_DELETED,
    SUCCESSFUL_DELETION,
    SUCCESSFUL_DELETION_WITH_DEFINED_ID
} = require('../error/ApiMessages')

class TypeController {
    //create one object
    async create(req, res, next) {
        const { name } = req.body
        Type.create({ name }).then((data) => {
            return res.json(data)
        }).catch((err) => {
            next(ApiError.internal(ERROR_OBJECT_IS_NOT_CREATE))
        })

    }

    //update one object
    async update(req, res, next) {
        try {
            const { id } = req.params
            const type = await Type.update(req.body, {
                where: { id: id }
            })
            return res.json(type)
        } catch (err) {
            next(ApiError.internal(ERROR_OBJECT_IS_NOT_UPDATE))
        }
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
            const compare = (a, b) => a.name > b.name ? 1 : -1
            return res.json(types.sort(compare))
        } catch (e) {
            next(ApiError.internal(ERROR_DATA_IS_NOT_RECEIVED))
        }

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