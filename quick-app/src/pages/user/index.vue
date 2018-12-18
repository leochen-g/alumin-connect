<template>
  <div class="alumni-main">
    <div class="user-main">
      <div class="user-content">
        <div class="user-header" @click="goPath('user')">
          <img :src="userInfo?userInfo.avataUrl:'https://lg-me0h2lia-1256919187.cos.ap-shanghai.myqcloud.com/bitmap.png'" class="user-avataurl-img" alt="">
          <div class="user-base-info">
            <div class="user-nick-name">{{userInfo?userInfo.nickName:'昵称'}}</div>
            <div class="user-school">{{userInfo?userInfo.school.graduationTime:'毕业时间'}} @ {{userInfo?userInfo.school.university:'学校'}}</div>
          </div>
        </div>
        <div v-if="hasAuth">
          <div class="user-info-item" @click="goPath('school')">
            <div class="aliiconfont info-item-icon">&#xe680;</div>
            <div class="info-item-title">院校</div>
          </div>
          <div class="user-info-item" @click="goPath('company')">
            <div class="aliiconfont info-item-icon">&#xe615;</div>
            <div class="info-item-title">公司</div>
          </div>
          <div class="user-info-item" @click="goUserTopic()">
            <div class="aliiconfont info-item-icon">&#xe6e8;</div>
            <div class="info-item-title">话题</div>
          </div>
          <div class="user-info-item" @click="">
            <div class="aliiconfont info-item-icon">&#xe642;</div>
            <div class="info-item-title">设置</div>
          </div>
        </div>
        <div v-if="!hasAuth">
          <div class="login-main">
            <button open-type="getUserInfo" type="primary" size="default" class="login-btn" @getuserinfo="onGotUserInfo">登录</button>
            <div class="login-tips">登陆后即刻开启校友生活</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'
  import {getUserInfo} from '../../http/api'
  export default {
    name: 'index',
    components: {},
    computed: {
      location () {
        return globalStore.state.location
      }
    },
    data () {
      return {
        userInfo: '',
        openId: wx.getStorageSync('openId'),
        hasAuth: wx.getStorageSync('hasAuth')
      }
    },
    onReady: function () {
      if (this.hasAuth) {
        this.getUserInfo()
      }
    },
    onShow: function () {
      if (this.hasAuth) {
        this.getUserInfo()
      }
    },
    methods: {
      getUserInfo () {
        let _this = this
        getUserInfo().then(res => {
          globalStore.commit('updateUserInfo', res.data)
          _this.userInfo = res.data
        })
      },
      goPath (val) {
        let url = '../user-edit/main'
        globalStore.commit('updateEditType', val)
        wx.navigateTo({ url })
      },
      goUserTopic () {
        let url = '../user-topic/main'
        wx.navigateTo({ url })
      },
      onGotUserInfo: function (e) {
        let _this = this
        console.log(e)
        if (e.mp.detail.userInfo) {
          wx.setStorageSync('hasAuth', true)
          _this.hasAuth = true
          globalStore.commit('updateNickName', e.mp.detail.userInfo.nickName)
          wx.setStorageSync('nickName', e.mp.detail.userInfo.nickName)
          _this.updateUserBaseInfo(e.mp.detail.userInfo)
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
      // 更新用户基本信息
      updateUserBaseInfo (obj) {
        let _this = this
        wx.request({
          url: _this.GLOBAL.serverPath + '/api/user/updateUserBase',
          method: 'POST',
          data: {
            nickName: obj.nickName,
            avatarUrl: obj.avatarUrl,
            country: obj.country,
            gender: obj.gender
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded '
          },
          success: function (res) {
            _this.getUserInfo()
          }
        })
      }
    }

  }
</script>

<style scoped>
  .alumni-main{
    background-color: #f4f5f5;
    height: 100%;
    width: 100%;
  }
  .user-main{
    position: fixed;
    background-color: #F2F2F2;
    width: 100%;
    height: 100%;
  }
  .user-content{
    padding-top: 40rpx;
  }
  .user-header{
    background-color: #ffffff;
    display: flex;
    position: relative;
    justify-content: flex-start;
    padding: 20rpx 20rpx;
  }
  .user-avataurl-img{
    width: 120rpx;
    height: 120rpx;
  }
  .user-base-info{
    padding: 20rpx;
  }
  .user-nick-name{
    font-size: 28rpx;
  }
  .user-school{
    color: #BFBEBE;
  }
  .user-info-item{
    display: flex;
    justify-content: flex-start;
    padding: 20rpx;
    margin-top: 40rpx;
    width: 100%;
    height: 60rpx;
    line-height: 60rpx;
    background-color: #ffffff;
  }
  .info-item-icon{
    font-size: 40rpx;
    color: #027fff;
  }
  .info-item-title{
    padding-left: 40rpx;
    font-size: 28rpx;
  }
  .login-main{
    padding-top: 200rpx;
    height: 400rpx;
    width: 100%;
    text-align: center;
  }
  .login-btn{
    width: 400rpx;
  }
  .login-tips{
    padding-top: 20rpx;
    font-size: 24rpx;
    color: #b5b5b5;
    text-align: center;
  }
</style>
