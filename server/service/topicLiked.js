var redis = require('../redis/redisConfig')
var until = require('../until')
var timeMap = until.getTime()

var topicService = {
  // 对主题添加赞
  addTopicLiked: function (tid, uid) {
	var pipeLine = redis.pipeline()
	return pipeLine.zadd('t:' + tid + ':liked', [timeMap, uid]).zadd('u:' + uid + ':liked', [timeMap, tid]).exec()
  },
  // 获取指定主题的赞的总数
  getLikedCountByTid: function (tid) {
	return redis.zcard('t:' + tid +':liked')
  },
  // 获取用户点赞主题的总数
  getLikedCountByUid: function (uid) {
	return redis.zcard('u:' + uid + ':liked')
  },
  // 获取用户是否对某个主题点赞
  hasUserLikedByTid: function (tid, uid) {
	return zscore('t:'+tid+':liked',uid)
  },
  // 用户取消点赞
  removeTopicLiked: function (tid,uid) {
    var pipeLine = redis.pipeline()
	return promise = pipeLine.zrem('t:'+tid+':liked', uid).zrem('u:'+uid+':liked',tid).exec()
  },
  // 取消指定周期内的点赞
  removeLikedByRangeTime: function (tid, start, end) {
	return redis.zremrangebyscore('t:'+tid+':liked',start,end)
  }

}

module.exports = topicService