<template>
  <div class="message-main" @click="changeMessageStatus(todo.id,todo.topicInfo.id,todo.flag)">
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
      changeMessageStatus (mid, tid, flag) {
        let req = {
          mid: mid
        }
        globalStore.commit({
          type: 'updateUserMessageFlag',
          value: 0,
          index: this.index
        })
        globalStore.commit('updateSelectTopicId', tid)
        if (flag) {
          readMessage(req).then(res => {
            const url = '../topic-detail/main'
            wx.navigateTo({ url })
          })
        } else {
          const url = '../topic-detail/main'
          wx.navigateTo({ url })
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .message-main{
    margin-top 15rpx
    background-color: whiteColor;
    border-radius 8rpx
    -moz-box-shadow:0 4rpx 18rpx rgba(2,127,255,0.3);
    -webkit-box-shadow:0 4rpx 18rpx rgba(2,127,255,0.3);
    box-shadow:0 4rpx 18rpx rgba(2,127,255,0.3);
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
    color: themeColor;
  }
  .message-content-main{
    display: flex;
    justify-content: space-between;
  }
  .active-msg {
   color:  themeColor;
  }
</style>
