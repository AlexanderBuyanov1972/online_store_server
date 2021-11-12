const ApiError = require('../error/ApiError')
const { User, UserAddress } = require('../models/models')

class UserController {
   
    async create(req, res, next) {

        return data
    }

    async update(req, res, next) {
        const { id } = req.params
        const { nameRecipient, familyRecipient, phoneNumberRecipient, city, street, house, apatment, index } = req.body
        const { name, family, email, dateBirth, phoneNumber, passwordOld, passwordNew } = req.body
        if (passwordOld && passwordOld !== '') {
            const one = await User.findOne({ where: { id } })
            console.log('one--->', one)
            if (!one)
                return next(ApiError.bedRequest({ 'message': 'Пользователь с таким id не существует' }))
            let comparePassword = bcrypt.compareSync(passwordOld, one.password)
            if (!comparePassword) {
                return next(ApiError.bedRequest({ 'message': 'Ваш старый пароль не верен' }))
            }
            const hashPassword = await bcrypt.hash(passwordNew, 5)
            const user = { id, name, family, email, dateBirth, phoneNumber, password: hashPassword, role: one.role }
            User.update(user, {
                where: { id }
            }).then(num => {
                if (num == 1)
                    return res.send(user)
            }).catch(e => {
                return next(ApiError.bedRequest(e.message))
            })
        }

        if (nameRecipient && nameRecipient !== '') {
            const addressRecipient = {
                nameRecipient, familyRecipient, phoneNumberRecipient,
                city, street, house, apatment, index, userId: id
            }
            await UserAddress.create(addressRecipient)
            const data = await UserAddress.findAndCountAll({ where: { userId: id } })
            return res.json(data)
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