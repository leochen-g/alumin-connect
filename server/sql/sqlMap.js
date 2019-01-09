var sqlMap = {
  provinces: {
	insert: "insert into provinces(pid,name) values (?,?)",
	getProvinceName: "select*from provinces",
  },
  city: {
	insert: "insert into city(pid,city) values (?,?)"
  },
  university: {
	insert: "insert into university(pid,name,website,city,level,usercount,abbreviation) values (?,?,?,?,?,?,?)",
	search: "select id,name,schoolBadge from university where name like concat('%',?,'%') limit 0,10;",
	groupBy: "select name,count(name) as value from user join provinces on user.pid=provinces.pid  where university=? GROUP BY name ORDER BY count(name) desc",
	locationCount: "select count(DISTINCT location) as locationCount,count(openid) as userCount from user where university = ? ;"
  },
  user: {
	updateBase: 'update user set nickName = ?,avataUrl = ?, country = ?, gender = ?, unionid = ?  where openid = ?;',
	updateDevice: 'update user set brand = ?,model = ?, system = ?, platform = ?  where openid = ?;',
	insert: "insert ignore into user(openid,nickName,avataUrl,country,gender) values (?,?,?,?,?); ",
	select: "select * from user where openid in (?)",
	updateUniversity: "update user set university =? where openid=?;",
	saveUsrLocation: "update user set pid=?,location=? where openid=?"
  },
  group: {
	getPublicBanner: 'select * from screen_map where type = "public" and flag = 1;',
	getLocationBanner: 'select * from screen_map where location = ? and flag = 1;',
	getUniversityBanner: 'select * from screen_map where university = ? and flag = 1;',
    addTopic:'insert into topic(openId, location, university, nickName, content) values (?,?,?,?,?)',
	deleteTopic:'update topic set flag = 0 where id = ? and openId = ?',
	getTopicListByUserId:'select a.*, b.avataUrl, b.college, b.graduationTime, b.location, b.major, b.nickName, b.university from topic a inner join user b on a.openId = b.openid where a.openId = ? and a.flag=1 order by a.id desc',
	getTopicById:'select a.*, b.avataUrl, b.college, b.graduationTime, b.location, b.major, b.nickName, b.university from topic a inner join user b on a.openId = b.openid  where a.id = ? and a.flag=1',
	getTopicList:'select count(id) as count from topic where university = ? and flag=1 and location= ?;select a.*, b.avataUrl, b.college, b.graduationTime, b.location, b.major, b.nickName, b.university from topic a inner join user b on a.openId = b.openid where a.university = ? and a.flag=1 and a.location= ? order by a.id desc limit ?,?',
	addTipOffs: 'insert into tip_off (openId,topicId,type) values (?,?,?)',
	addComment:'insert into comment(openId, cid, topicId,content) values (?,?,?,?)',
	deleteComment:'update comment set flag = 0 where id = ? and openId = ?',
	updateCommentCount:'update topic set commentCount=commentCount+1 where id = ?',
	reduceCommentCount:'update topic set commentCount=commentCount-1 where id = ?',
	updateReplyCount:'update comment set replyCount=replyCount+1 where cid = ?',
	reduceReplyCount:'update comment set replyCount=replyCount-1 where cid = ?',
	getCommentList:'select a.*, b.avataUrl, b.college, b.graduationTime, b.location, b.major, b.nickName, b.university from comment a inner join user b on a.openId = b.openid where a.topicId = ? and a.flag=1 order by a.id desc limit ?,?;select count(b.cid) as count from comment b where b.topicId = ? and b.flag=1',
	// getCommentList:'select C.*,R.* from (select c.*, u.avataUrl, u.college, u.graduationTime, u.location, u.major, u.nickName, u.university from comment c inner join user u on c.openId = u.openid where c.topicId = ? and c.flag=1 order by c.id desc limit ?,?) C left join (select r.id  rid,r.cid rcid,r.content rcontent,r.replyType,r.openId ropenId,r.toUid rtoUid,r.flag rflag,r.updatedAt rupdatedAt ,b.avataUrl ravataUrl, b.college rcollege, b.graduationTime rgraduationTime, b.location rlocation, b.major rmajor, b.nickName rnickName, b.university runiversity, c.nickName respNickName from  reply r inner join user b on r.openId = b.openid inner join user c on r.toUid = c.openid where r.flag=1 order by r.id desc) R on C.cid = R.rcid;select count(b.cid) as count from comment b where b.topicId = ? and b.flag=1',
	getCommentListCount:'select count(b.cid) as count from comment b where b.topicId = ? and b.flag=1 order by b.updatedAt desc',
	getCommentListByUserId:'select a.location,a.university,a.gender,a.avataUrl,a.college,a.major,b.* from user a inner join comment b on a.openid=b.openId where b.openId = ? and b.flag=1',
	addReply:'insert into reply(openId,cid,replyId,replyType,content,toUid,toNickName,topicId) values (?,?,?,?,?,?,?,?)',
	getReplyById: 'select a.*, b.avataUrl, b.college, b.graduationTime, b.location, b.major, b.nickName, b.university from reply a inner join user b on a.openId = b.openid where a.id=?',
	deleteReply:'update reply set flag = 0 where rid = ? and openId =?',
	getReplyList:'select count(id) as count from reply where cid=? and flag=1;select a.*, b.avataUrl, b.college, b.graduationTime, b.location, b.major, b.nickName, b.university from reply a inner join user b on a.openId = b.openid where a.cid=? and a.flag=1 order by a.id desc limit 0,2',
	getReplyListNoLimit:'select count(id) as count from reply where cid=? and flag=1;select a.*, b.avataUrl, b.college, b.graduationTime, b.location, b.major, b.nickName, b.university from reply a inner join user b on a.openId = b.openid where a.cid=? and a.flag=1 order by a.id desc',
	user:{
      getReplyUserInfo:'select openid, nickName, location, university, gender, avataUrl, graduationTime, college, major, phone, company, job from user where openid in(?,?)',
	  findUser: 'select id from user where unionid = ?',
      getUserInfo:'select openid, nickName, location, university, gender, avataUrl, graduationTime, college, major, phone, wechat, company, job from user where openid = ?',
	  updateUserNickName:'update user set nickName = ? where openid = ?',
	  updateUserContact:'update user set phone = ? where openid = ?',
	  updateUserSchoolInfo:'update user set university = ?, graduationTime = ?, college = ?, major = ?  where openid = ?',
	  updateUserCompanyInfo:'update user set company = ?, job = ? where openid = ?',
	  checkLikedMessage: 'select count(id) as count from message where contentType="liked" and producer = ? and topicId = ?',
	  addUserMessage:'insert into message (msgType,contentType,topicId,producer,consumer) values (?,?,?,?,?)',
	  getUnReadMessageCount: 'select count(id) as count from message where msgType = "user" and consumer = ? and flag = 1;',
	  getMessage:'select a.*, b.id as topicId,b.content,b.flag as topicFlag, c.nickName, c.avataUrl from message a inner join topic b on a.topicId = b.id inner join user c on a.producer = c.openid where msgType = "user" and consumer = ? order by flag desc, updatedAt desc',
	  getSystemMessage:'select count(id) as count from bulletin;select * from bulletin order by flag desc, updatedAt desc',
	  readMessage:'update message set flag = 0 where id = ? and consumer = ?'
	},
	admin:{
	  getTipOffs: 'select c.id,c.type,b.id as topicId,b.content,b.university,b.location,a.nickName,a.openId,a.avataUrl from (user a inner join tip_off c on a.openId=c.openId) inner join topic b where b.id=c.topicId order by id desc',
	  addSystemMessage: 'insert into message (msgType,contentType,title,imgSrc,detail) values (?,?,?,?,?)',
	  getUniversityList: 'select * from university limit ?,?',
	  updateUniversityBadge: 'update university set schoolBadge = ? where id = ?'
	}
  }
}
module.exports = sqlMap
