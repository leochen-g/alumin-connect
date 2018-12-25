<template>
  <div class="message">
    <systemMessageItem v-for="(item,index) in systemMessage" :key="item.id" :todo="item" :index="index"/>
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'
  import systemMessageItem from '../../components/systemMessageItem'
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
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
  .message{
    background-color: #ffffff;
    height: 100%;
    width: 100%;
  }
</style>
