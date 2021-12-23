const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const { User, Basket, Favorite } = require('../models/models')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class AuthController {
    async registration(req, res, next) {
        const { email, password, role } = req.body
        if (!email || !password) {
            return next(ApiError.bedRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({ where: { email } })

        if (candidate) {
            return next(ApiError.bedRequest('Пользователь с таким email уже существует'))
        }
        //хеширование пароля
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, password: hashPassword, role })
        const basket = await Basket.create({ userId: user.id })
        const favorite = await Favorite.create({ userId: user.id })
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }

    async login(req, res) {
        const { email, password } = req.body
        let user
        try {
            user = await User.findOne({ where: { email } })
            if(!user)
            return res.json({ 'message': 'Пользователь с таким email не существует. Зарегистрируйтесь.' })
        } catch (error) {
            return res.json({ 'message': error.message })
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.json({ 'message': 'Пароли не совпадают' })
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }
}

module.exports = new AuthController()