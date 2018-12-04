<template>
  <div class="reply-form reply">
    <div class="form-box">
      <div class="input-box">
        <input v-model="replyContent" :placeholder="placeholder" type="text" maxlength="100" class="input">
      </div>
      <div class="action-box">
        <div class="submit">
          <button class="comment-submit-btn" v-show="!replyContent">评论</button>
          <button class="comment-submit-btn active" @click="addReply" v-show="replyContent">评论</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topic-reply-form',
    data () {
      return {
        replyContent: '',
        placeholder: '回复' + this.replyNickName
      }
    },
    props: {
      replyNickName: {
        required: true
      },
      replyId: {
        required: true
      }
    },
    methods: {
      addReply () {
        console.log('回复id', this.replyId)
        console.log('回复内容', this.replyContent)
      }
    }
  }
</script>

<style scoped>
  .reply-form {
    margin-top: .25rem;
    padding: .24rem;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    padding: .24rem .30rem;
    background-color: #fafbfc;
    border-radius: 6 rpx
  }

  .form-box {
    flex: 1 1 auto;
    position: relative;
  }

  .input-box {
    background-color: #fff;
    border: 2 rpx solid #007fff;
    border-radius: 6 rpx;
  }

  .input {
    position: relative;
    padding: .14rem .24rem;
    font-size: 26 rpx;
    line-height: 1.7;
    color: #17181a;
    outline: none;
    min-height: .72rem;
  }

  .action-box {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    margin: .14rem 0 0;
  }

  .submit {
    flex: 0 0 auto;
    margin-left: auto;
  }

  .comment-submit-btn {
    opacity: .2;
    ms-flex: 0 0 auto;
    flex: 0 0 auto;
    margin-left: auto;
    padding: 0 .30rem;
    font-size: .26rem;
    color: #fff;
    background-color: #027fff;
    border-radius: 4 rpx;
    cursor: pointer;
  }
  .active{
    opacity: 2;
  }
</style>
