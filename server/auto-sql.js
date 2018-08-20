//利用sequelize-auto对照数据库自动生成相应的models
const SequelizeAuto = require('sequelize-auto')
const configs = require('./config')
const env = process.env.NODE_ENV || 'development'
const config  = configs[env]

// 创建数据库连接
var auto = new SequelizeAuto(config.database, config.username, config.password,{
  host: config.host,
  dialect: 'mysql',
  directory: './models', // prevents the program from writing to disk
  port: config.port,
  additional: {
	timestamps: false
  }
})
auto.run(function (err) {
  if (err) throw err;
  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});