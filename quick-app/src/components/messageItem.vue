<template>
  <div class="message-main" @click="changeMessageStatus(todo.id)">
    <div class="message-content" >
      <div class="message-panel">
        <!--头像-->
        <div class="message-left">
          <div class="user-avataurl">
            <img v-bind:src="todo.producer.avataUrl" alt="" class="user-avataUrl-img">
          </div>
        </div>
        <!--消息主体-->
        <div class="message-right">
          <div class="message-header">
            <div class="message-user-nickName">{{todo.producer.nickName}}</div>
            <div class="message-time">{{createTime}}</div>
          </div>
          <div class="message-content-main ellipsis">
            <span v-if="todo.contentType==='liked'">赞了：{{todo.topicInfo.content}}</span>
            <span v-if="todo.contentType==='comment'">评论了你的话题：{{todo.topicInfo.content}}</span>
            <span v-if="todo.contentType==='reply'">回复了你的评论：{{todo.topicInfo.content}}</span>
            <span v-show="todo.flag" v-bind:class="{'active-msg':todo.flag}" class="aliiconfont">&#xe643;</span>
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
    name: 'messageItem',
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

<style scoped>
  .message-main{
    background-color: #f4f5f5;
  }

  .message-panel {
    display: flex;
    justify-content: space-between;
    position: relative;
  }

  .message-left {
    display: flex;
    justify-content: flex-start;
    position: relative;
    width: 80rpx;
    padding: 8rpx 10rpx;
  }
  .user-avataurl {
    width: 80rpx;
    height: 80rpx;
  }

  .message-right{
    flex: 1;
    padding: 8rpx 10rpx 12rpx 10rpx;
    border-bottom: 1px solid #e1e1e1;
  }

  .message-header{
    display: flex;
    justify-content: space-between;
  }

  .user-avataUrl-img {
    width: 100%;
    height: 100%;
  }

  .message-user-nickName {
    font-size: 28rpx;
    font-weight: bold;
    color: #027fff;
  }
  .message-content-main{
    display: flex;
    justify-content: space-between;
  }
  .active-msg {
   color:  #027fff;
  }
</style>
