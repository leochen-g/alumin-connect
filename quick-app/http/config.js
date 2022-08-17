import store from '../store'
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly()
const host = 'https://wechat.xkboke.com'
// const host = 'http://127.0.0.1:4000'
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
    'content-type': 'application/x-www-form-urlencoded ',
    'authorization': wx.getStorageSync('token') || ''
  }

  let authParams = {
    // 公共参数
    'openId': store.getters.openId || ''
  }
  // 去除值为空的参数
  // request.body && Object.keys(request.body).forEach((val) => {
  //   if (request.body[val] === '') {
  //     delete request.body[val]
  //   }
  // })
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
    if (response.data.head.code === 401) { // 鉴权失败
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
    } else if (response.data.head.code === 10000) { // 后端错误,网络失败
      wx.showToast({
        title: response.data.head.msg,
        duration: 2000
      })
    } else if (response.data.head.code === 10001) { // 缺少必须的参数
      wx.showToast({
        title: response.data.head.msg,
        duration: 2000
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
