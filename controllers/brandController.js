const {Brand} = require('../models/models')
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

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const brand = await Brand.create({name})
            return res.json(brand)
        } catch (e) {
            next(ApiError.internal(ERROR_OBJECT_IS_NOT_CREATE))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const brand = await Brand.update(req.body, {
                where: {id: id}
            })
            return res.json(brand)
        } catch (e) {
            next(ApiError.internal(ERROR_OBJECT_IS_NOT_UPDATE))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const brand = await Brand.findByPk(id)
            return res.json(brand)
        } catch (e) {
            next(ApiError.bedRequest(ERROR_OBJECT_IS_NOT_EXIST))
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await Brand.findAll()
            const compare = (a, b) => a.name > b.name ? 1 : -1
            return res.json(brands.sort(compare))
        } catch (e) {
            next(ApiError.internal(ERROR_DATA_IS_NOT_RECEIVED))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            await Brand.destroy({where: {id: id}})
            return res.json({"message": SUCCESSFUL_DELETION_WITH_DEFINED_ID})
        } catch (e) {
            next(ApiError.bedRequest(ERROR_OBJECT_IS_NOT_EXIST))
        }
    }

    async deleteAll(req, res, next) {
        try {
            await Brand.destroy()
            return res.json({"message": SUCCESSFUL_DELETION})
        } catch (e) {
            next(ApiError.internal(ERROR_DATA_IS_NOT_DELETED))
        }
    }

}

module.exports = new BrandController()