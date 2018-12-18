var Redis = require('ioredis')
var config = require('../config')
var redis = new Redis({port:config.RDS_PORT,host:config.RDS_HOST,password:config.RDS_PWD})

redis.on("error", function (err) {
  console.log("Error :" , err);
});

redis.on('connect', function(res){
  console.log('Redis连接成功.');
})
/**
 * 有序集合添加
 * @param key
 * @param value
 * @return {Promise<void>}
 */
// rds.zadd = (key, value) => {
//   return client.zadd(key, value)
// }
/**
 * 有序集合获取指定key的value总数
 * @param key
 * @return {*}
 */
// rds.zcard = (key) => {
//   return client.zcard(key)
// }
/**
 * 有序集合返回所有数据
 * @param key
 * @return {*}
 */
// rds.zrange  = (key) => {
//   return client.zrange(key, 0, -1)
// }
/**
 * 有序就和获取指定key的值是否存在
 * @param key
 * @param value
 * @return {*}
 */
// rds.zscore = (key, value) => {
//   return client.zscore(key,value)
// }
/**
 * 有序集合移除指定key的value值
 * @param key
 * @param value
 * @return {*}
 */
// rds.zrem = (key,value) => {
//   return client.zrem(key,value)
// }
// rds.zremrangebyscore = (key,start,end) => {
//   return client.zremrangebyscore(key,start,end)
// }
module.exports = redis