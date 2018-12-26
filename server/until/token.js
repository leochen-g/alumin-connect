let jwt = require('jsonwebtoken')
let config = require('../config')

function getUserId(token = '') {
  if (!token) {
	return 0
  }
  const result = parse(token)
  if (!result.openId) {
	return 0
  }
  return result
}

//生成token
function createJWT(opt) {
  const payload = {
	userId: opt.userId
  };
  return jwt.sign(payload, config.JWTSECRET);
}

//解析token
function parse(token) {
  if (token) {
	try {
	  return jwt.verify(token, config.JWTSECRET)
	} catch (err) {
	  return null
	}
  }
  return null
}

//验证token
function verifyToken(token, id) {
  if (token) {
	var decode = jwt.verify(token, config.JWTSECRET)
	if (decode.userId) {
	  return id == decode.userId
	} else {
	  return false
	}
  } else {
	return false
  }
}

module.exports = {
  getUserId, createJWT, verifyToken, parse
}
