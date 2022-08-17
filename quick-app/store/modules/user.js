import { login, getOpenId, updateUserDeviceInfo, getUserLocation } from '../../http/api'

const user = {
  state: {
    nickName: '',
    university: '',
    auth: false,
    token: '',
    openId: '',
    location: '',
    shareImg: 'http://image.bloggeng.com/share-img.jpeg',
    shareDetail: '校友来了带你看看同城校友在聊什么？'
  },
  mutations: {
    SET_NICKNAME: (state, name) => {
      state.nickName = name
    },
    SET_AUTH: (state, auth) => {
      state.hasAuth = auth
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_OPENID: (state, openid) => {
      state.openId = openid
    },
    SET_LOCATION: (state, location) => {
      state.location = location
    },
    SET_UNIVERSITY: (state, university) => {
      state.university = university
    }
  },
  actions: {
    wxLogin ({ commit }) {
      uni.getSetting({
        success: function (res) {
          console.log('授权', res.authSetting['scope.userInfo'])
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.login({
              success: (resCode) => {
                wx.getUserInfo({
                  success: (res) => {
					  console.log("info", res)
                    commit('SET_NICKNAME', res.userInfo.nickName)
                    const {encryptedData, iv} = res
                    login({code: resCode.code, encryptedData: encryptedData, iv: iv}).then(res => {
                      commit('SET_TOKEN', res.data.token)
                      commit('SET_OPENID', res.data.openId)
                      commit('SET_AUTH', true)
                    })
                  }
                })
              }
            })
          } else {
            wx.login({
              success: (resCode) => {
                const obj = { code: resCode.code }
                getOpenId(obj).then(res => {
                  commit('SET_OPENID', res.data.openid)
                  const deviceInfo = wx.getSystemInfoSync()
                  updateUserDeviceInfo({brand: deviceInfo.brand, model: deviceInfo.model, system: deviceInfo.system, platform: deviceInfo.platform}).then(res => {
                    console.log('更新设备信息')
                  }).catch(err => {
                    console.log('设备获取失败', err)
                  })
                  wx.getLocation({
                    success: (res) => {
                      const location = res.latitude + ',' + res.longitude
                      getUserLocation({location: location}).then(res => {
                        commit('SET_LOCATION', res.data.city)
                      })
                    }
                  })
                })
              }
            })
          }
        }
      })
    },
    getLocation ({commit}) {
      let _this = this
      wx.getLocation({
        success: (res) => {
          const location = res.latitude + ',' + res.longitude
          getUserLocation({location: location}).then(res => {
            commit('SET_LOCATION', res.data.city)
          })
        },
        fail: () => {
          _this.openConfirm()
        }
      })
    },
    openConfirm () {
      wx.showModal({
        content: '检测到您没打开校友足迹的定位权限，是否去设置打开？',
        confirmText: '确认',
        cancelText: '取消',
        success: function (res) {
          // 点击“确认”时打开设置页面
          if (res.confirm) {
            wx.openSetting({
              success: (res) => { }
            })
          } else {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
}
export default user
