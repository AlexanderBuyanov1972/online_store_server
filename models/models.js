const sequelize = require('../db')
const { DataTypes } = require('sequelize')

// Создание сущностей

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    payment: { type: DataTypes.STRING, allowNull: false },
    post: { type: DataTypes.STRING, allowNull: false },
    options: { type: DataTypes.STRING, allowNull: false },
    branchParcelMachine: { type: DataTypes.STRING, allowNull: false },
    comments: { type: DataTypes.STRING, allowNull: false },
    sendBill: { type: DataTypes.BOOLEAN, allowNull: false },
    
})

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },

    name: { type: DataTypes.STRING },
    family: { type: DataTypes.STRING },
    dateBirth: { type: DataTypes.STRING },
    phoneNumber: { type: DataTypes.STRING },
})

const UserAddress = sequelize.define('user_address', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    family: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    street: { type: DataTypes.STRING, allowNull: false },
    house: { type: DataTypes.STRING, allowNull: false },
    apatment: { type: DataTypes.STRING, allowNull: false },
    index: { type: DataTypes.STRING, allowNull: false },
    isDefault: { type: DataTypes.BOOLEAN, allowNull: false },
})


const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
const Favorite = sequelize.define('favorite', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketDevice = sequelize.define('basket_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})
const FavoriteDevice = sequelize.define('favorite_device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Device = sequelize.define('device', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    rating: { type: DataTypes.INTEGER, defaultValue: 0 },
    img: { type: DataTypes.STRING, allowNull: false },
})

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Rating = sequelize.define('rating', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    rate: { type: DataTypes.INTEGER, allowNull: false },
})

const DeviceInfo = sequelize.define('device_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})

// Создание промежуточной таблицы для связи ManyToMany
const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // все остальные поля sequelize добавит сам
})

// Описание связей
User.hasOne(Basket)
Basket.belongsTo(User)

User.hasOne(Favorite)
Favorite.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Favorite.hasMany(FavoriteDevice)
FavoriteDevice.belongsTo(Favorite)

Device.hasOne(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasOne(FavoriteDevice)
FavoriteDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, { as: 'info' })
DeviceInfo.belongsTo(Device)

User.hasMany(UserAddress, { as: 'address' })
UserAddress.belongsTo(User)

Type.hasMany(Device)
Device.belongsTo(Type)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

Order.hasOne(User)
User.belongsTo(Order)

Order.hasOne(UserAddress)
UserAddress.belongsTo(Order)

const Photo = sequelize.define('photo', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    img: { type: DataTypes.STRING, allowNull: false },
    group: { type: DataTypes.STRING, allowNull: false },
})

module.exports = {
    User, UserAddress, Device, Type, BasketDevice, Brand, DataTypes,
    DeviceInfo, Basket, Rating, Photo, FavoriteDevice, Favorite, Order
}