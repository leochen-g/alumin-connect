<template>
  <div class="system-message-main" @click="changeMessageStatus(todo.id)">
    <div class="system-message-content" >
      <div class="system-message-panel">
        <!--头像-->
        <div class="system-message-left">
          <div class="system-user-avataurl">
            <img v-bind:src="todo.imgSrc" alt="" class="system-user-avataUrl-img">
          </div>
        </div>
        <!--消息主体-->
        <div class="system-message-right">
          <div class="system-message-header">
            <div class="system-message-title">{{todo.title}}</div>
            <div class="system-message-updateTime">{{createTime}}</div>
          </div>
          <div class="system-message-content-main ">
            <div class="system-message-detail ellipsis2 ">{{todo.detail}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import globalStore from '../store/global-store'
  import {readMessage} from '../http/api'

  export default {
    name: 'systemMessageItem',
    props: {
      todo: {
        required: true
      },
      index: {
        required: true
      }
    },
    computed: {
      createTime () {
        let tempDate = new Date(this.todo.updateAt)
        let year = tempDate.getFullYear()
        let month = tempDate.getMonth() + 1
        let day = tempDate.getDate()
        let hour = tempDate.getHours()
        let min = tempDate.getMinutes()
        let second = tempDate.getSeconds()
        if (hour < 10) {
          hour = '0' + hour
        }
        if (min < 10) {
          min = '0' + min
        }
        if (second < 10) {
          second = '0' + second
        }
        return year + '/' + (month > 9 ? month : '0' + month) + '/' + (day > 9 ? day : '0' + day)
      }
    },
    methods: {
      changeMessageStatus (id) {
        let req = {
          mid: id
        }
        globalStore.commit({
          type: 'updateUserMessageFlag',
          value: 0,
          index: this.index
        })
        globalStore.commit('updateSelectTopicId', id)
        readMessage(req).then(res => {
          const url = '../topic-detail/main'
          wx.navigateTo({ url })
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .system-message-main{
    background-color: background-color ;
  }

  .system-message-panel {
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .system-message-left {
    display: flex;
    justify-content: flex-start;
    position: relative;
    padding: 8rpx 10rpx;
  }
  .system-user-avataurl {
    width: 200rpx;
    height: 100rpx;
  }

  .system-message-right{
    flex: 1;
    padding: 8rpx 10rpx 12rpx 10rpx;
  }

  .system-message-header{
    display: flex;
    justify-content: space-between;
  }

  .system-user-avataUrl-img {
    width: 100%;
    height: 100%;
  }

  .system-message-title {
    font-weight: bold;
    color: themeColor;
  }
  .system-message-content-main{
    display: flex;
    justify-content: space-between;
  }
  .system-active-msg {
   color:  themeColor;
  }
  .system-message-detail{
    color grayColor
  }
</style>
