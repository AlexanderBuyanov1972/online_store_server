const { Photo } = require('../models/models')
const ApiError = require('../error/ApiError')
const uuid = require('uuid')
const path = require('path')

class PhotoController {

    async create(req, res, next) {
        const { group } = req.body
        const { img } = req.files
        let fileName = uuid.v4() + '.jpg'
        await img.mv(path.resolve(__dirname, '..', 'static/photos', fileName))
        try {
            const data = await Photo.create({ img: fileName, group })
            res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        const { id } = req.params
        const { group } = req.body
        const { img } = req.files
        let fileName = uuid.v4() + '.jpg'
        await img.mv(path.resolve(__dirname, '..', 'static/photos', fileName))
        try {
            const data = await Photo.update({ group, img: fileName }, { where: { id } })
            res.json({ message: 'Обновление фото прошло успешно' })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // get one object by id
    async getOne(req, res, next) {
        const { id } = req.params
        try {
            const data = await Photo.findByPk(id)
            res.json(data)
        } catch (e) {
            return next(ApiError.bedRequest(e.message))
        }
    }

    // get group objects by group
    async getGroup(req, res, next) {
        const { group } = req.params
        try {
            const data = await Photo.findAll({ where: { group } })
            res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }




    // get all sorted objects
    async getAll(req, res, next) {
        try {
            const data = await Photo.findAll()
            res.json(data)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // delete one object by id
    async delete(req, res, next) {
        const { id } = req.params
        try {
            Photo.destroy({ where: { id } })
            res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // delete group object by group
    async deleteGroup(req, res, next) {
        const { group } = req.params
        try {
            Photo.destroy({ where: { group } })
            res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    // delete all objects
    async deleteAll(req, res, next) {
        try {
            Photo.destroy()
            res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }
}
module.exports = new PhotoController()