<template>
  <div class="message">
    <messageItem v-for="(item,index) in userMessage" :key="item.id" :todo="item" :index="index"/>
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'
  import messageItem from '../../components/messageItem'
  import {getUserMessage} from '../../http/api'
  export default {
    name: 'index',
    components: {
      messageItem
    },
    computed: {
      userMessage () {
        return globalStore.state.userMessage
      }
    },
    onShow: function () {
      wx.setNavigationBarTitle({
        title: '消息通知'
      })
    },
    async onPullDownRefresh () { // 下拉刷新
      this.getUserMessage()
      wx.stopPullDownRefresh()
    },
    data () {
      return {
      }
    },
    methods: {
      getUserMessage () {
        getUserMessage().then(res => {
          globalStore.commit('updateUserMessage', res.data.list)
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .message{
    padding 10rpx 30rpx
  }
</style>
