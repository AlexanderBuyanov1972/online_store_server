const { Device } = require('../models/models')
const uuid = require('uuid')
const path = require('path')

let { name, price } = req.body
const { img } = req.files
let fileName = uuid.v4() + '.jpg'
await img.mv(path.resolve(__dirname, '..', 'static', fileName))

const device = await Device.create({ name, price, img: fileName })