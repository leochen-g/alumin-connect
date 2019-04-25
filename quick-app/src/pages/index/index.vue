<template>
  <div class="container" >
    <div class="schoolMain">
      <div class="school-info">
        <div >
          <p class="title">选 择 院 校</p>
        </div>
        <p class="aliiconfont universityIcon" >&#xe955;</p>
        <div class="userinfo-nickname">
          <p class="university">{{university}}</p>
        </div>
        <div class="university-input">
          <input type="text" v-model="university" disabled placeholder="搜索" class="search-input" @click="toSearch">
        </div>
        <div class="button-finish">
          <button  v-if="university!=='请选择'" class="finish"  @click="goCharts">查看足迹</button>
          <button  v-if="university==='请选择'" class="finish"  @click="saveTips" >查看足迹</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'
  import {getOpenId, getUserLocation, updateUserDeviceInfo, login} from '../../http/api'

  export default {
    computed: {
      university () {
        return globalStore.state.university
      },
      nickName () {
        return globalStore.state.nickName
      },
      shareImg () {
        return globalStore.state.shareImg
      },
      shareDetail () {
        return globalStore.state.shareDetail
      }
    },
    data () {
      return {
        city: '',
        location: ''
      }
    },
    created () {
      this.wxLogin()
      wx.setNavigationBarTitle({
        title: '校友来了'
      })
    },
    onShareAppMessage (options) {
      return {
        title: this.shareDetail,
        path: '/pages/index/main',
        imageUrl: this.shareImg,
        success: function (res) {
          console.log('分享成功')
        }
      }
    },
    onShow () {
      this.updateLocation()
    },
    methods: {
      // 调用登录接口
      wxLogin () {
        const _this = this
        wx.getSetting({
          success: function (res) {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称
              wx.login({
                success: (resCode) => {
                  wx.getUserInfo({
                    success: (res) => {
                      globalStore.commit('updateNickName', res.userInfo.nickName)
                      wx.setStorageSync('nickName', res.userInfo.nickName)
                      const {encryptedData, iv} = res
                      let req = {
                        code: resCode.code,
                        encryptedData: encryptedData,
                        iv: iv
                      }
                      login(req).then(res => {
                        wx.setStorageSync('token', res.data.token)
                        wx.setStorageSync('openId', res.data.openId)
                        wx.setStorageSync('hasAuth', true)
                        globalStore.commit('updateAuth', true)
                      })
                    }
                  })
                }
              })
            } else {
              wx.login({
                success: (resCode) => {
                  _this.getOpenId(resCode.code)
                }
              })
            }
          }
        })
      },
      openConfirm () {
        wx.showModal({
          content: '检测到您没打开校友足迹的定位权限，是否去设置打开？',
          confirmText: '确认',
          cancelText: '取消',
          success: function (res) {
            console.log(res)
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
      },
      // 更新位置信息
      updateLocation () {
        let _this = this
        wx.getLocation({
          success: (res) => {
            _this.location = res.latitude + ',' + res.longitude
            _this.getUserLocation(_this.location, wx.getStorageSync('openId'))
          },
          fail: () => {
            _this.openConfirm()
          }
        })
      },
      // 获取用户openid
      getOpenId (val) {
        const _this = this
        const obj = {
          code: val
        }
        getOpenId(obj).then(res => {
          wx.setStorageSync('openId', res.data.openid)
          try {
            const deviceInfo = wx.getSystemInfoSync()
            _this.updateUserDeviceInfo(deviceInfo)
          } catch (e) {
            console.log('设备获取失败')
          }
          wx.getLocation({
            success: (res) => {
              _this.location = res.latitude + ',' + res.longitude
              _this.getUserLocation(_this.location, _this.openId)
            }
          })
        })
      },
      // 根据经纬度获取用户位置
      getUserLocation (val) {
        const _this = this
        const obj = {
          location: val
        }
        getUserLocation(obj).then(res => {
          _this.city = res.data.city
          globalStore.commit('updateLocation', _this.city)
          wx.setStorageSync('location', _this.city)
        })
      },
      goCharts: function () {
        const url = '../charts/main'
        wx.navigateTo({ url })
      },
      saveTips () {
        wx.showModal({
          title: '温馨提示',
          showCancel: false,
          content: '请先选择你的院校',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../search/main'
              })
            }
          }
        })
      },
      // 更新用户设备信息
      updateUserDeviceInfo: function (info) {
        const req = {
          brand: info.brand,
          model: info.model,
          system: info.system,
          platform: info.platform
        }
        updateUserDeviceInfo(req).then(res => {
          console.log('更新设备信息')
        })
      },
      toSearch: function () {
        wx.navigateTo({
          url: '../search/main'
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .schoolMain{
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background-image: url('https://wechat.xkboke.com/static/img/index-bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .title{
    margin-top: 80rpx ;
    font-size: 28rpx;
    color: #ffffff;
  }
  .universityIcon{
    margin-top: 94rpx;
    font-size: 200rpx;
    color: whiteColor
    text-shadow 2rpx 2rpx 10rpx footColor
  }
  .school-info {
    background-color: rgba(0,0,0,0.85);
    height: 1444rpx;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .university{
    margin-top: 85rpx;
    font-size: 36rpx;
    letter-spacing: 6rpx;
    color whiteColor
  }
  .university-input{
    margin: 48rpx auto;
  }
  .button-finish{
    margin-top:100rpx;
  }
  .finish {
    position relative
    width: 260rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 16rpx;
    font-size: 28rpx;
    color whiteColor
    background-color: rgba(04,0e,17,1)
    border 2rpx solid #6dd7fb
    text-shadow:1px 1px 5px footColor
    box-shadow:1px 1px 5px footColor
  }
  .search-input{
    width: 400rpx ;
    border: 2rpx solid #ffffff;
    font-size: 22rpx;
    text-align: center;
    padding: 8rpx 20rpx;
    border-radius: 10rpx;
    color: #aaa;
    box-shadow:1px 1px 5px footColor
  }
</style>
