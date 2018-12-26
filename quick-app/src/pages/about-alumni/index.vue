<template>
  <div class="alumni-main">
    <div class="about-main">
      <div class="about-content">
        <div class="about-title">关于校友足迹</div>
        <div class="about-content">
          一个致力于帮助同城校友联系的好圈子，个人兴趣开发，如果你有更好的电子，欢迎反馈给我
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
