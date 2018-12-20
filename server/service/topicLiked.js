var redis = require('../redis/redisConfig')
var until = require('../until')
var timeMap = until.getTime()

var topicService = {
  // 对主题添加赞
  addTopicLiked: async function (tid, uid) {
	var pipeLine = redis.pipeline()
	console.log('点赞')
	return  await pipeLine.zadd('t:' + tid + ':liked', [timeMap, uid]).zadd('u:' + uid + ':liked', [timeMap, tid]).exec()
  },
  // 获取指定主题的赞的总数
  getLikedCountByTid: async function (tid) {
	return await redis.zcard('t:' + tid +':liked')
  },
  // 获取用户点赞主题的总数
  getLikedCountByUid: async function (uid) {
	return await redis.zcard('u:' + uid + ':liked')
  },
  // 获取用户是否对某个主题点赞
  hasUserLikedByTid: async function (tid, uid) {
	return await redis.zscore('t:'+tid+':liked',uid)
  },
  // 用户取消点赞
  removeTopicLiked: async function (tid,uid) {
    console.log('取消点赞')
    var pipeLine = redis.pipeline()
	return await  pipeLine.zrem('t:'+tid+':liked', uid).zrem('u:'+uid+':liked',tid).exec()
  },
  // 取消指定周期内的点赞
  removeLikedByRangeTime: async function (tid, start, end) {
	return await redis.zremrangebyscore('t:'+tid+':liked',start,end)
  }

}

module.exports = topicService