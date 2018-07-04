<template>
  <div class="container" >
    <div class="cityMain">
      <div class="city-info">
        <p class="iconfont location" >&#xe60a;</p>
        <div class="userinfo-nickname">
          <p class="locationCity">{{locationCity}}</p>
        </div>
        <view class="section">
          <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
            <view class="picker reLocation">
              <span class="err">定位错误</span>？
            </view>
          </picker>
        </view>
        <button  class="counter" open-type="getUserInfo" @click="saveLocation" v-bind:style="{ backgroundColor:tap ? '#729ef6': '#5f95ff'}" @touchstart="tapStart" @touchend="tapEnd" bindgetuserinfo="bindGetUserInfo">下一步</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      customItem: '全部',
      region: ['', '', ''],
      motto: 'Hello World',
      code: '',
      openId: '',
      userInfo: {},
      locationCity: '定位中',
      screenWidth: 0,
      screenHeight: 0,
      tap: false
    }
  },
  onLoad: function (options) {
    var _this = this
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          _this.hasAuth = true
          wx.getUserInfo({
            success: (res) => {
              console.log('userInfo', res)
              _this.userInfo = res.userInfo
            }
          })
        } else {
          _this.hasAuth = false
          _this.userInfo = {
            nickName: '',
            avatarUrl: '',
            country: '',
            gender: ''
          }
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },
  onShareAppMessage (options) {
    console.log(options)
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
    tapStart () {
      this.tap = true
    },
    tapEnd () {
      this.tap = false
    },
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    bindRegionChange: function (e) {
      this.region = e.target.value
      this.locationCity = this.region[1]
    },
    // 获取用户基本信息
    getUserInfo () {
      var _this = this
      // 调用登录接口
      wx.login({
        success: (resCode) => {
          this.code = resCode.code
          this.getOpenId(resCode.code)
          wx.getLocation({
            success: (res) => {
              var location = res.latitude + ',' + res.longitude
              _this.getUserLocation(location)
            }
          })
        }
      })
    },
    // 获取用户openid
    getOpenId (val) {
      var _this = this
      wx.request({
        url: this.GLOBAL.serverPath + '/api/user/openid',
        method: 'POST',
        data: {
          code: val
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded '
        },
        success: function (res) {
          _this.openId = res.data.data.openid
          wx.setStorageSync('openId', _this.openId)
          _this.saveUserInfo(_this.userInfo, res.data.data.openid)
        }
      })
    },
    // 根据经纬度获取用户位置
    getUserLocation (val) {
      var _this = this
      wx.request({
        url: this.GLOBAL.serverPath + '/api/user/getLocation',
        method: 'GET',
        data: {
          location: val
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          _this.region = res.data.data
          _this.locationCity = res.data.data[1]
        }
      })
    },
    // 保存用户基本信息
    saveUserInfo (obj, oid) {
      wx.request({
        url: this.GLOBAL.serverPath + '/api/user/save',
        method: 'POST',
        data: {
          nickName: obj.nickName,
          avatarUrl: obj.avatarUrl,
          country: obj.country,
          gender: obj.gender,
          openid: oid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded '
        },
        success: function (res) {
          console.log('保存成功')
        }
      })
    },
    // 保存用户位置和省份
    saveLocation () {
      var _this = this
      const url = '../school/main'
      wx.navigateTo({ url })
      wx.request({
        url: this.GLOBAL.serverPath + '/api/user/update',
        method: 'POST',
        data: {
          oid: _this.openId,
          location: _this.locationCity,
          pid: _this.getPid(_this.region[0]),
          university: ''
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded '
        },
        success: function (res) {
          console.log('保存成功')
        }
      })
    },
    getPid (val) {
      return this.GLOBAL.provinceMap[val]
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },
  mounted () {
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
  .cityMain {
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-image: url('https://lg-me0h2lia-1256919187.cos.ap-shanghai.myqcloud.com/bg1.jpg');
    background-size: 100%;
  }
  .location{
    margin-top: 200rpx;
    font-size: 240rpx;
    color: #ffffff;
  }
  .err{
    text-decoration: underline;
  }
  .city-info {
    background-color: rgba(0,0,0,0.85);
    height: 1334rpx;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .reLocation{
    margin-top: 45rpx;
    font-size: 18rpx;
    color: #c5c5c5;
  }
  .locationCity{
    margin-top: 67rpx;
    font-size: 56rpx;
    color: #ffffff;
    letter-spacing: 20rpx;
  }
  .userinfo-nickname {
    color: #aaa;
  }
  .counter {
    width: 166rpx;
    height: 60rpx;
    font-size: 28rpx;
    text-align: center;
    margin-top: 287rpx;
    vertical-align: center;
    /*padding: 10rpx 20rpx;*/
    color: #ffffff;
    background-color: #5f95ff;
    border-radius: 15rpx;
  }
  .loading{
    display: inline-block;
    margin-top: 6rpx;
    width: 20rpx;
    height: 20rpx;
    border: .2em solid currentColor;
    border-radius: 50%;
    -webkit-animation: load 1s ease-out infinite;
    animation: load 1s ease-out infinite;
  }
  @-webkit-keyframes load {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }
  @keyframes load {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }
</style>
