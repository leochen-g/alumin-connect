<template>
  <div class="alumni-main">
    <div class="setting-main">
      <div class="setting-content">
          <div class="setting-info-item" >
            <button class="setting-item-title alumni-btn" open-type="contact">帮助</button>
          </div>
          <div class="setting-info-item" >
            <button class="setting-item-title alumni-btn" open-type="feedback">反馈</button>
          </div>
          <div class="setting-info-item" @click="goAbout()">
            <div class="setting-item-title">关于校友足迹</div>
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
      location () {
        return globalStore.state.location
      }
    },
    data () {
      return {
        userInfo: ''
      }
    },
    onShow: function () {
      wx.setNavigationBarTitle({
        title: '设置'
      })
    },
    methods: {
      goAbout () {
        let url = '../about-alumni/main'
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
  .setting-main{
    position: fixed;
    background-color: #F2F2F2;
    width: 100%;
    height: 100%;
  }
  .setting-content{
    margin-top: 20rpx;
    background-color: #ffffff;
  }
  .setting-info-item{
    display: flex;
    justify-content: flex-start;
    padding: 20rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-bottom: 1px solid #e1e1e1;
    margin: 0 40rpx;
  }
  .setting-info-item:last-child{
    border-bottom: none!important;
  }
  .setting-item-title{
    font-size: 28rpx;
    color: #999999;
  }
  .alumni-btn{
    border: none!important;
    width: 100%;
    background-color: #ffffff;
    text-align: left;
    padding: 0;
  }
  .alumni-btn:after{
    border: none!important;
  }
</style>
