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
        Photo.create({ img: fileName, group }).then(data =>
            res.json(data)
        ).catch(e =>
            next(ApiError.internal(e.message))
        )

    }

    async update(req, res, next) {
        const { id } = req.params
        const { group } = req.body
        const { img } = req.files
        let fileName = uuid.v4() + '.jpg'
        await img.mv(path.resolve(__dirname, '..', 'static/photos', fileName))

        Photo.update({ group, img: fileName }, {
            where: { id }
        }).then(() => res.json({ message: 'Обновление фото прошло успешно' }))
            .catch(e =>
                next(ApiError.internal(e.message))
            )
    }

    // get one object by id
    async getOne(req, res, next) {
        const { id } = req.params
        Photo.findByPk(id).then(data => res.json(data))
            .catch(e =>
                next(ApiError.bedRequest(e.message)))
    }

    // get group objects by group
    async getGroup(req, res, next) {
        const { group } = req.params
        Photo.findAll({ where: { group } }).then(data => res.json(data))
            .catch(e =>
                next(ApiError.bedRequest(e.message)))
    }




    // get all sorted objects
    async getAll(req, res, next) {
        Photo.findAll()
            .then(data =>
                res.json(data)
            )
            .catch(e => next(ApiError.internal(e.message)))
    }

    // delete one object by id
    async delete(req, res, next) {
        const { id } = req.params
        Photo.destroy({ where: { id } })
            .then(data => res.json({ "message": "Удаление прошло успешно" }))
            .catch(e => next(ApiError.bedRequest(e.message)))
    }

    // delete group object by group
    async deleteGroup(req, res, next) {
        const { group } = req.params
        Photo.destroy({ where: { group } })
            .then(data => res.json({ "message": "Удаление прошло успешно" }))
            .catch(e => next(ApiError.bedRequest(e.message)))
    }

    // delete all objects
    async deleteAll(req, res, next) {
        Photo.destroy()
            .then(data => res.json({ "message": "Удаление прошло успешно" }))
            .catch(e => next(ApiError.internal(e.message)))
    }
}
module.exports = new PhotoController()