<template>
  <div class="alumni-main">
    <div class="about-main">
      <div class="about-content">
        <div>关于校友足迹</div>
        一个致力于帮助同城校友联系的好圈子，个人兴趣开发
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
  .alumni-main{
    background-color: backGroundColor;
    height: 100%;
    width: 100%;
  }
  .about-main{
    position: fixed;
    background-color: #F2F2F2;
    width: 100%;
    height: 100%;
  }
</style>
