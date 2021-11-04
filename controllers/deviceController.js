const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class DeviceController {
    async create(req, res, next) {
        let { name, price, rating, typeId, brandId, info } = req.body
        const { img } = req.files
        try {
            let fileName = uuid.v4() + '.jpg'
            await img.mv(path.resolve(__dirname, '..', 'static/photoDevices', fileName))

            const device = await Device.create({ name, price, rating, typeId, brandId, img: fileName })

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
        } catch (e) {
            return next(ApiError.bedRequest(e.message))
        }

    }

    async update(req, res, next) {
        const { id } = req.params
        try {
            let fileName = ''
            let { name, price, rating, typeId, brandId, img, info } = req.body
            if (img) {
                fileName = img
            } else {
                const { img } = req.files
                fileName = uuid.v4() + '.jpg'
                await img.mv(path.resolve(__dirname, '..', 'static', fileName))
            }
            Device.update({ name, price, typeId, brandId, rating, img: fileName }, {
                where: { id }
            }).then(num => {
                if (num == 1)
                    res.send({ message: ApiError.messageOK })
            }).catch(e => {
                return next(ApiError.bedRequest(e.message))
            })


            if (info) {
                info = JSON.parse(info)
                await DeviceInfo.destroy({ where: { deviceId: id } })
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: id
                    })
                })
            }

            return res.json({ "message": ApiError.messageOK })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }


    async getOne(req, res, next) {
        const { id } = req.params
        try {
            const device = await Device.findOne({
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            })
            return res.json(device)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let { typeId, brandId, limit, pageCurrent } = req.query
            pageCurrent = pageCurrent || 1
            limit = limit || 5
            let offset = (pageCurrent - 1) * limit
            let devices;
            if (brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
            }
            if (!brandId && typeId) {
                devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
            }
            if (brandId && !typeId) {
                devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
            }
            if (!brandId && !typeId) {
                devices = await Device.findAndCountAll({ limit, offset })
            }
            return res.json(devices)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }


    async delete(req, res, next) {
        const { id } = req.params
        try {
            await Device.destroy({ where: { id: id } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.bedRequest(e.message))
        }
    }

    async deleteAll(req, res, next) {
        try {
            await Device.destroy()
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

}

module.exports = new DeviceController()