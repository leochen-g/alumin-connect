const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
const host = 'http://127.0.0.1:4000'
// 添加请求拦截器
fly.config.baseURL = host
fly.interceptors.request.use((request) => {
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  // request.headers['X-Tag'] = 'flyio'
  // request.headers['content-type']= 'application/json'
  request.headers = {
    'X-Tag': 'flyio',
    'content-type': 'application/x-www-form-urlencoded '
  }

  let authParams = {
    // 公共参数
    'openId': wx.getStorageSync('openId') || ''
  }

  request.body && Object.keys(request.body).forEach((val) => {
    if (request.body[val] === '') {
      delete request.body[val]
    }
  })
  request.body = {
    ...request.body,
    ...authParams
  }
  return request
})

// 添加响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading()
    if (response.data.head.code === 10000) {
      wx.showModal({
        title: '提示',
        content: '登录后即可查看校友圈子',
        showCancel: false,
        success (res) {
          if (res.confirm) {
            wx.switchTab({
              url: '../user/main'
            })
          }
        }
      })
    }
    return response.data // 请求成功之后将返回值返回
  },
  (err) => {
    // 请求出错，根据返回状态码判断出错原因
    wx.hideLoading()
    if (err) {
      return '请求失败'
    }
  }
)
export default fly
