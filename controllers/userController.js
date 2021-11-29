const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { User, UserAddress } = require('../models/models')

class UserController {

    async create(req, res, next) {
        const { name, family, email, dateBirth, phoneNumber, password } = req.body
        if (password && password !== '') {
            const one = await User.findOne({ where: { email } })
            if (one)
                return next(ApiError.bedRequest({ 'message': 'Пользователь с таким email ужее существует' }))
            const hashPassword = await bcrypt.hash(password, 5)
            const user = { name, family, email, dateBirth, phoneNumber, password: hashPassword, role: 'USER' }
            User.create(user)
                .then(data => { return res.send(data) })
                .catch(e => {
                    return next(ApiError.bedRequest(e.message))
                })
        }

        if (name && name !== '') {
            const address = {
                name, family, phoneNumber, city, street, house, apatment, index, userId: id
            }
            await UserAddress.create(addressRecipient)
            const data = await UserAddress.findAndCountAll({ where: { userId: id } })
            return res.json(data)
        }
    }

    async update(req, res, next) {
        const { id } = req.params
        const { name, family, email, dateBirth, phoneNumber, passwordOld, passwordNew } = req.body
        if (passwordOld && passwordOld !== '') {
            const one = await User.findOne({ where: { id } })
            if (!one)
                return next(ApiError.bedRequest({ 'message': 'Пользователь с таким id не существует' }))
            let comparePassword = bcrypt.compareSync(passwordOld, one.password)
            if (!comparePassword) {
                return next(ApiError.bedRequest({ 'message': 'Ваш старый пароль не верен' }))
            }
            const hashPassword = await bcrypt.hash(passwordNew, 5)
            const user = { name, family, email, dateBirth, phoneNumber, password: hashPassword, role: one.role }
            User.update(user, {
                where: { id }
            }).then(num => {
                if (num == 1)
                    return res.send({ message: 'Обновление пользователя прошло успешно' })
            }).catch(e => {
                return next(ApiError.bedRequest(e.message))
            })
        }

    }

    async get(req, res, next) {
        const { id } = req.params
        try {
            const user = await User.findOne({
                where: { id },
                // include: [{ model: UserAddress, as: 'address' }]
            })
            return res.json(user)
        } catch (e) {
            return next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        const { id } = req.params
        try {
            await User.destroy({ where: { id } })
            return res.json({ "message": ApiError.messageDeleteSuccessfully })
        } catch (e) {
            return next(ApiError.bedRequest(e.message))
        }
    }

}

module.exports = new UserController()