<template>
  <div class="alumni-main">
    <div class="user-main">
      <div class="user-content">
        <div class="user-header" @click="goPath('user')">
          <img src="https://wx.qlogo.cn/mmopen/vi_32/rRIIkQo8Wibzm5nPalxwZv1cwGia6gm6Th9WRCVvLHa81JRvEVmlcLQmjvGRv6NjUxb7bgbOY3neZIBCAs3QoA2Q/132" class="user-avataurl-img" alt="">
          <div class="user-base-info">
            <div class="user-nick-name">Leo</div>
            <div class="user-school">2018@合肥师范学院</div>
          </div>
        </div>
        <div>
          <div class="user-info-item" @click="goPath('school')">
            <div class="aliiconfont info-item-icon">&#xe680;</div>
            <div class="info-item-title">院校</div>
          </div>
          <div class="user-info-item" @click="goPath('company')">
            <div class="aliiconfont info-item-icon">&#xe615;</div>
            <div class="info-item-title">公司</div>
          </div>
          <div class="user-info-item" @click="">
            <div class="aliiconfont info-item-icon">&#xe642;</div>
            <div class="info-item-title">设置</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'

  export default {
    name: 'index',
    components: {},
    computed: {
      university () {
        return globalStore.state.university
      },
      nickName () {
        return globalStore.state.nickName
      },
      location () {
        return globalStore.state.location
      }
    },
    data () {
      return {
        userInfo: '',
        openId: wx.getStorageSync('openId')
      }
    },
    onReady: function () {
      this.getUserInfo()
    },
    methods: {
      getUserInfo () {
        let _this = this
        wx.request({
          url: _this.GLOBAL.serverPath + '/api/group/user/getUserInfo',
          method: 'POST',
          data: {
            openId: _this.openId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded '
          },
          success: function (res) {
            globalStore.commit('updateUserInfo', res.data.data)
            _this.userInfo = res.data.data
          }
        })
      },
      goPath (val) {
        let url = '../user-edit/main'
        wx.navigateTo({ url })
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
</style>
