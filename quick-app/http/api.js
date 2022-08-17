import fly from './config'
/**
 * 校友足迹接口
 **/
// 获取openId
export const getOpenId = (params) => { return fly.post('/api/user/openid', params) }
// 获取用户位置
export const getUserLocation = (params) => { return fly.post('/api/user/getLocation', params) }
// 更新用户设备信息
export const updateUserDeviceInfo = (params) => { return fly.post('/api/user/updateUserDevice', params) }
// 更新用户基本信息
export const updateUserBaseInfo = (params) => { return fly.post('/api/user/updateUserBase', params) }
// 更新用户大学信息
export const updateUserUniversity = (params) => { return fly.post('/api/user/updateUniversity', params) }
// 模糊搜索大学
export const getUniversity = (params) => { return fly.get('/api/user/getUniversity', params) }
// 获取map地图数据
export const getMapData = (params) => { return fly.get('/api/user/getMapData', params) }
// 获取校友人数
export const getUserAndLocation = (params) => { return fly.get('/api/user/getUserAndLocation', params) }
/**
 * 校友圈子接口
 **/
// 获取话题列表
export const getTopicList = (params) => { return fly.post('/api/group/getTopicList', params) }
// 获取用户话题列表
export const getUserTopicList = (params) => { return fly.post('/api/group/getTopicListByUserId', params) }
export const getTopicById = (params) => { return fly.post('/api/group/getTopicById', params) }
// 获取banner图
export const getBannerList = (params) => { return fly.post('/api/group/getBannerList', params) }
// 添加话题
export const addTopic = (params) => { return fly.post('/api/group/addTopic', params) }
// 添加评论
export const addComment = (params) => { return fly.post('/api/group/addComment', params) }
// 添加回复
export const addReply = (params) => { return fly.post('/api/group/addReply', params) }
// 获取回复列表
export const getReplyList = (params) => { return fly.post('/api/group/getReplyList', params) }
// 获取评论列表
export const getCommentList = (params) => { return fly.post('/api/group/getCommentList', params) }
// 删除话题
export const deleteTopic = (params) => { return fly.post('/api/group/deleteTopic', params) }
// 举报话题
export const tipOffsTopic = (params) => { return fly.post('/api/group/postTipOffsTopic', params) }
// 点赞
export const addLiked = (params) => { return fly.post('/api/group/addLiked', params) }
// 获取未读消息数
export const getUserUnReadMessageCount = (params) => { return fly.post('/api/group/user/getUserUnReadMessageCount', params) }
// 获取用户通知
export const getUserMessage = (params) => { return fly.post('/api/group/user/getUserMessage', params) }
// 获取系统通知
export const getSystemMessage = (params) => { return fly.post('/api/group/user/getSystemMessage', params) }
// 阅读系统消息
export const readSystemMessage = (params) => { return fly.post('/api/group/user/systemMessageRead', params) }
// 已读消息
export const readMessage = (params) => { return fly.post('/api/group/user/readMessage', params) }

/**
 * 个人中心接口
 **/
// 登录
export const login = (params) => { return fly.post('/api/user/login', params) }
// 获取用户信息
export const getUserInfo = (params) => { return fly.post('/api/group/user/getUserInfo', params) }
// 获取选择的用户信息
export const getSelectUserInfo = (params) => { return fly.post('/api/group/user/getSelectUserInfo', params) }
// 更新用户基础信息
export const updateUserInfo = (params) => { return fly.post('/api/group/user/updateUserInfo', params) }
