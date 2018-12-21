<template>
  <div class="message-main" @click="changeMessageStatus(todo.id)">
    <div class="message-content" v-bind:class="{'active-msg':todo.flag}">
       <span v-if="todo.contentType==='liked'">{{todo.producer.nickName}}赞了：{{todo.topicInfo.content}}</span>
       <span v-if="todo.contentType==='comment'">{{todo.producer.nickName}}评论了你的话题：{{todo.topicInfo.content}}</span>
       <span v-if="todo.contentType==='reply'">{{todo.producer.nickName}}回复了你的评论：{{todo.topicInfo.content}}</span>
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
        readMessage(req).then(res => {
        })
      }
    }
  }
</script>

<style scoped>
  .slide-image{
    width: 100%;
    height: 100%;
  }
  .active-msg{
    border: 1px solid #00ea3f;
  }
</style>
