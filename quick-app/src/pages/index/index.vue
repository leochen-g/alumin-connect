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
          <button hover-class="hover" v-show="university!=='请选择'" class="finish"  @click="goCharts">出&nbsp;&nbsp;发</button>
          <button hover-class="hover" v-show="university==='请选择'" class="finish"  @click="saveTips" >出&nbsp;&nbsp;发</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'
  import {getOpenId, getUserLocation, updateUserDeviceInfo, updateUserBaseInfo} from '../../http/api'

  export default {
    computed: {
      university () {
        return globalStore.state.university
      },
      nickName () {
        return globalStore.state.nickName
      }
    },
    data () {
      return {
        userInfo: {},
        city: '',
        location: ''
      }
    },
    onReady: function (options) {
      const _this = this
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            _this.hasAuth = true
            globalStore.commit('updateAuth', _this.hasAuth)
            wx.setStorageSync('hasAuth', true)
            wx.getUserInfo({
              success: (res) => {
                _this.userInfo = res.userInfo
                globalStore.commit('updateNickName', _this.userInfo.nickName)
                wx.setStorageSync('nickName', _this.userInfo.nickName)
              }
            })
          } else {
            _this.hasAuth = false
            wx.setStorageSync('hasAuth', false)
            globalStore.commit('updateAuth', _this.hasAuth)
            _this.userInfo = {
              nickName: '校友足迹',
              avatarUrl: 'https://lg-me0h2lia-1256919187.cos.ap-shanghai.myqcloud.com/bitmap.png',
              country: 'China',
              gender: '1'
            }
          }
        }
      })
    },
    onShareAppMessage (options) {
      return {
        title: '快来看看你的校友在哪里？',
        path: '/pages/index/main',
        imageUrl: 'https://lg-me0h2lia-1256919187.cos.ap-shanghai.myqcloud.com/bg.jpeg',
        success: function (res) {
          console.log('分享成功')
        }
      }
    },
    methods: {
      // 调用登录接口
      wxLogin () {
        const _this = this
        wx.login({
          success: (resCode) => {
            _this.code = resCode.code
            _this.getOpenId(resCode.code)
            // 获取openid
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
              console.log('用户点击确认')
              wx.openSetting({
                success: (res) => { }
              })
            } else {
              console.log('用户点击取消')
            }
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
          _this.openId = res.data.openid
          wx.setStorageSync('openId', _this.openId)
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
        let _this = this
        wx.getSetting({
          success: (res) => {
            if (!res.authSetting['scope.userLocation']) {
              _this.openConfirm()
            }
          }
        })
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
      // 更新用户基本信息
      updateUserBaseInfo (obj) {
        const req = {
          nickName: obj.nickName,
          avatarUrl: obj.avatarUrl,
          country: obj.country,
          gender: obj.gender
        }
        updateUserBaseInfo(req).then(res => {
          console.log('更新用户基础信息')
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
    },
    created () {
      this.wxLogin()
    }
  }
</script>

<style scoped>
  .schoolMain{
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background-image: url('https://lg-me0h2lia-1256919187.cos.ap-shanghai.myqcloud.com/bg7.jpg');
    background-repeat: no-repeat;
    background-size: 100%;
  }
  .title{
    margin-top: 80rpx ;
    font-size: 28rpx;
    color: #ffffff;
  }
  .universityIcon{
    margin-top: 94rpx;
    font-size: 200rpx;
    color: #FFFFFF;
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
  }
  .userinfo-nickname {
    color: #ffffff;
  }
  .university-input{
    margin: 48rpx auto;
  }
  .button-finish{
    margin-top:200rpx;
  }
  .finish {
    width: 360rpx;
    height: 70rpx;
    line-height: 70rpx;
    color: #FFFFFF;
    background-color: #5687e7 ;
    border-radius: 16rpx;
    font-size: 32rpx ;
  }
  .search-input{
    width: 400rpx ;
    border: 2rpx solid #ffffff;
    font-size: 22rpx;
    text-align: center;
    padding: 8rpx 20rpx;
    border-radius: 10rpx;
    color: #aaa;
  }
  .hover{
    background-color: #6DA9E7;
  }
</style>
