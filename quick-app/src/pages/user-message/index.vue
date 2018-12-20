<template>
  <div class="alumni-main">
    消息中心
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'

  export default {
    name: 'index',
    computed: {
      editType () {
        return globalStore.state.editType
      }
    },
    onShow: function () {
      wx.setNavigationBarTitle({
        title: '消息通知'
      })
    },
    data () {
      return {
        focusInput: false,
        userInfo: '',
        date: '',
        type: ''
      }
    },
    methods: {

    }

  }
</script>

<style scoped>
  .alumni-main{
    background-color: #f4f5f5;
    height: 100%;
    width: 100%;
  }
</style>
