<template>
  <div class="alumni-connect">
    <div class="message">
      <systemMessageItem v-for="(item,index) in systemMessage" :key="item.id" :todo="item" :index="index"/>
    </div>
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'
  import systemMessageItem from '../../components/systemMessageItem'
  import {getSystemMessage} from '../../http/api'
  export default {
    name: 'index',
    components: {
      systemMessageItem
    },
    computed: {
      systemMessage () {
        return globalStore.state.systemMessage
      }
    },
    onShow: function () {
      wx.setNavigationBarTitle({
        title: '系统通知'
      })
      wx.setBackgroundColor({
        backgroundColor: '#123456'
      })
    },
    async onPullDownRefresh () { // 下拉刷新
      wx.stopPullDownRefresh()
    },
    data () {
      return {
      }
    },
    methods: {
      getSystemInfo () {
        getSystemMessage().then(res => {
          globalStore.commit('updateSystemMessage', res.data.list)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .alumni-connect{
    width 100%
    height 100%
    padding-bottom 20rpx
  }
  .message{
    padding 10rpx 30rpx
  }
</style>
