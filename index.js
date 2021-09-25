require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const filesUpload = require('express-fileupload')
const {static} = require("express");
const path = require('path')


const PORT = process.env.PORT || 5000
const app = express()
// Для использования запросов браузера
app.use(cors())
// Для передачи джейсонов
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(filesUpload({}))
app.use('/api', router)
//Обработка ошибок, идёт обязателно последним
app.use(errorHandler)

// Создание методов
// app.get('/', (req, res) => {
//     res.status(200).json({message: 'WORKING!!!'})
// })


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server starting on the port ${PORT}...`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()

