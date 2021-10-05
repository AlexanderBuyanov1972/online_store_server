const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo, Type, Brand} = require('../models/models')
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

class DeviceController {
    async create(req, res, next) {
        try {
            let {name, price, typeId, brandId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const device = await Device.create({name, price, typeId, brandId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                })
            }

            return res.json(device)
        } catch (err) {
            next(ApiError.bedRequest(ERROR_OBJECT_IS_NOT_CREATE))
        }

    }

    async update(req, res, next) {
        try {
            let {name, price, typeId, brandId, info, id} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            await Device.destroy({where: {id: id}})
            const device = await Device.create({id, name, price, typeId, brandId, img: fileName})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: id
                    })
                })
            }
            return res.json(device)
        }catch (e) {
            next(ApiError.internal(ERROR_OBJECT_IS_NOT_UPDATE))
        }

    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const device = await Device.findOne({
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            })
            return res.json(device)
        } catch (e) {
            next(ApiError.bedRequest(ERROR_OBJECT_IS_NOT_EXIST))
        }
    }

    async getAll(req, res, next) {
        try {
            let {typeId, brandId, limit, pageCurrent} = req.query
            pageCurrent = pageCurrent || 1
            limit = limit || 5
            let offset = (pageCurrent - 1) * limit
            let devices;
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({where: {typeId}, limit, offset})
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({where: {brandId}, limit, offset})
            }
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({limit, offset})
            }
            return res.json(devices)
        } catch (e) {
            next(ApiError.internal(ERROR_DATA_IS_NOT_RECEIVED))
        }
    }


    async delete(req, res, next) {
        try {
            const {id} = req.params
            await Device.destroy({where: {id: id}})
            return res.json({"message": SUCCESSFUL_DELETION_WITH_DEFINED_ID})
        } catch (e) {
            next(ApiError.bedRequest(ERROR_OBJECT_IS_NOT_EXIST))
        }
    }

    async deleteAll(req, res, next) {
        try {
            await Device.destroy()
            return res.json({"message": SUCCESSFUL_DELETION})
        } catch (e) {
            next(ApiError.internal(ERROR_DATA_IS_NOT_DELETED))
        }
    }

}

module.exports = new DeviceController()