var  Sequelize = require('sequelize');
const configs = require('../config/config')
const  env = process.env.NODE_ENV || 'development'
const config  = configs[env]

// 创建数据库连接
var sequelize = new Sequelize(config.database, config.username, config.password,config)
// 数据库模型名称及lujing
const models =[
    {
        "name": "City",
        "path": "./city.js"
    },
    {
        "name": "Province",
        "path": "./provinces.js"
    },
    {
        "name": "University",
        "path": "./university.js"
    },
    {
        "name": "User",
        "path": "./user.js"
    }
]
// 数据模型输出
models.forEach(item => {
    module.exports[item.name] = require(item.path)(sequelize, Sequelize)
})
