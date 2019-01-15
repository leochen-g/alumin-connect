<template>
  <div class="alumni-main">
    <div class="about-main">
      <div class="about-content">
        <div class="about-title">关于开发者</div>
        <div class="about-content">
          Leo_chen<br>
          90后前端工程师<br>
          就职于某互联网公司，主做大数据方向<br>
          日常喜欢玩玩游戏，写写小程序<br>
          也会在掘金分享一下开发经验,偶尔更新个人博客<br>
          技术栈：angular、node、express、vue、echarts、小程序等<br>
          您如果对这个小项目有任何想法或建议都可以直接联系我的微信<br>
          <div class="wechat" @click="clickToCopy">微信号：CG12104410(点击即可复制)</div>
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
        title: '关于开发者'
      })
    },
    methods: {
      goPath (val) {
        let url = '../user-edit/main'
        globalStore.commit('updateEditType', val)
        wx.navigateTo({ url })
      },
      clickToCopy () {
        wx.setClipboardData({
          data: 'CG12104410',
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
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
    font-size 28rpx
    line-height 1.5
    min-height 500rpx
    color textColor
  .wechat
    color themeColor
</style>
