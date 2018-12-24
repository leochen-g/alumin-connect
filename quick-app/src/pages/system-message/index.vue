<template>
  <div class="message">
    <messageItem v-for="(item,index) in userMessage" :key="item.id" :todo="item" :index="index"/>
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'
  import messageItem from '../../components/messageItem'
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
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  .message{
    background-color: #ffffff;
    height: 100%;
    width: 100%;
  }
</style>
