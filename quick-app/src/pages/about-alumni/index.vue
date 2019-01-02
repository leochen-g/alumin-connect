<template>
  <div class="alumni-main">
    <div class="about-main">
      <div class="about-content">
        <div class="about-title">关于校友足迹</div>
        <div class="about-content">
          校友足迹的灵感来源是因为一次同城校友聚会所引发的，每个学校或许都会有自己的校友会在不同的城市，
          但是每次校友会通知同城校友聚会，靠的都是口口相传或者通过微信群，不免有一些校友没有看到因此而错过与
          同城校友交流的机会。<br>所谓在家靠父母，在外靠朋友，同是大学校友，在一个城市相互帮忙想必是更好的。
          因此为了解决同城校友联络难，消息通知不及时等问题，基于微信的庞大用户量，以及小程序的便捷性，我特意开发了这个《校友来了》帮助同城校友的交流，
          以及及时发布通知让更多的同城校友看到。
          <br>在这里，你可以和同城校友畅聊天地，也可以与同城校友三两成群相约小聚。同时也可以掌握更多官方消息通知，不错过每个大型校友聚会。
          <br>为了更好的帮助消息的快速传播，每个学校都会有专属的轮播图，如果您的学校需要使用可以通过我的微信号找到我，我将会免费帮助你的院校进行宣传。
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
        title: '关于校友足迹'
      })
    },
    methods: {
      goPath (val) {
        let url = '../user-edit/main'
        globalStore.commit('updateEditType', val)
        wx.navigateTo({ url })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .about-main{
    position: fixed;
    background-color: whiteColor;
    width: 100%;
    height: 100%;
  }
  .about-title{
    font-size 28rpx
    text-align center
  }
  .about-content
    padding 20rpx
    text-indent 48rpx
    font-size 28rpx
    line-height 1.5
    min-height 500rpx
    color textColor
</style>
