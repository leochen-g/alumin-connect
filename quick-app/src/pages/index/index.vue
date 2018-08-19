<template>
  <div class="container" >
    <div class="schoolMain">
      <div class="school-info" @click="bindViewTap">
        <div >
          <p class="title">选 择 院 校</p>
        </div>
        <p class="iconfont universityIcon" >&#xe955;</p>
        <div class="userinfo-nickname">
          <p class="university">{{university}}</p>
        </div>
        <div class="university-input">
          <input type="text" v-model="university" disabled placeholder="搜索" class="search-input" @click="toSearch">
        </div>
        <div class="button-finish">
          <button v-if="university!=='请选择'" class="finish" open-type="getUserInfo" v-bind:style="{ backgroundColor:tap ? '#729ef6': '#5f95ff'}" @touchstart="tapStart" @touchend="tapEnd" @click="saveUniversity" @getuserinfo="bindGetUserInfo">完成</button>
          <button v-else="university==='请选择'" class="finish"  @click="saveTips" >完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        university: wx.getStorageSync('university'),
        tap: false,
        userInfo: {},
        city: '',
        location: ''
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
    onShow () {
      this.getUniversityName()
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
      // 调用登录接口
      getUserInfo () {
        var _this = this
        wx.login({
          success: (resCode) => {
            this.code = resCode.code
            // 获取openid
            wx.getLocation({
              success: (res) => {
                _this.location = res.latitude + ',' + res.longitude
                this.getOpenId(resCode.code)
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
            _this.getUserLocation(_this.location, _this.openId)
          }
        })
      },
      // 根据经纬度获取用户位置
      getUserLocation (val, oid) {
        var _this = this
        wx.request({
          url: this.GLOBAL.serverPath + '/api/user/getLocation',
          method: 'POST',
          data: {
            oid: oid,
            location: val
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded '
          },
          success: function (res) {
            console.log(res)
            _this.city = res.city
          }
        })
      },
      bindGetUserInfo: function (e) {
        var _this = this
        if (e.mp.detail.userInfo) {
          _this.userInfo = e.mp.detail.userInfo
          _this.updateUserBaseInfo(_this.userInfo)
          const url = '../charts/main'
          wx.navigateTo({ url })
          console.log('允许')
        } else {
          wx.showModal({
            title: '温馨提示',
            showCancel: true,
            content: '为了您更好的体验,请先同意授权',
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: function (res) {
                    if (res.authSetting['scope.userInfo']) {
                      console.log('谢谢授权')
                    } else {
                      console.log('还是没有授权')
                    }
                  }
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
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
        var _this = this
        var oid = wx.getStorageSync('openId')
        wx.request({
          url: _this.GLOBAL.serverPath + '/api/user/updateUserBase',
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
      tapStart () {
        this.tap = true
      },
      tapEnd () {
        this.tap = false
      },
      toSearch: function () {
        wx.navigateTo({
          url: '../search/main'
        })
      },
      getUniversityName () {
        var value = wx.getStorageSync('university')
        console.log(value)
        if (value) {
          this.university = value
        } else {
          this.university = '请选择'
        }
      },
      saveUniversity () {
        var _this = this
        var oid = wx.getStorageSync('openId')
        wx.request({
          url: this.GLOBAL.serverPath + '/api/user/updateUniversity',
          method: 'POST',
          data: {
            oid: oid,
            university: _this.university
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded '
          },
          success: function (res) {
            console.log('保存成功')
          }
        })
      }
    },
    mounted () {
      this.getUserInfo()
      this.getUniversityName()
    },
    created () {
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
    height: 100%;
    box-sizing: border-box;
    background-image: url('https://lg-me0h2lia-1256919187.cos.ap-shanghai.myqcloud.com/bg2.jpg');
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
    height: 1334rpx;
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
    margin-top:210rpx ;
  }
  .finish {
    width: 164rpx;
    padding: 10rpx 20rpx;
    color: #FFFFFF;
    line-height: 2;
    vertical-align: center;
    background-color: #5687e7 ;
    border-radius: 15rpx;
    font-size: 28rpx ;
  }
  .search-input{
    width: 400rpx ;
    border: 2rpx solid #5687e7;
    font-size: 22rpx;
    text-align: center;
    padding: 8rpx 20rpx;
    border-radius: 10rpx;
    color: #aaa;
  }
</style>
