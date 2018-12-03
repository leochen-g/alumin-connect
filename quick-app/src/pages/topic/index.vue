<template>
  <div class="alumni-main">
    <topicSwiper :list="urlList"/>
    <div class="topic-edit">
      <div class="topic-edit-body">
        <div class="topic-edit-content">
          <textarea maxlength="100" :placeholder="placeholder" class="edit-content edit" v-model="pushContent" @input="inputEvent" ></textarea>
          <span class="word-counter">{{wordCount-hasInputCount}}</span>
        </div>
      </div>
      <div class="edit-bottom">
        <div class="edit-toolbar">
          <div class="tool"></div>
          <div class="submit">
            <button class="submit-button" v-show="!pushContent">发布</button>
            <button class="submit-button active" v-show="pushContent" @click="pushTopic">发布</button>
          </div>
        </div>
      </div>
    </div>
    <topicList/>
  </div>
</template>

<script>
  import topicList from '../../components/topicList'
  import topicSwiper from '../../components/topicSwiper'

  export default {
    name: 'index',
    components: {
      topicList, topicSwiper
    },
    data () {
      return {
        urlList: [{'id': '1', 'url': 'http://image.bloggeng.com/shengdan.png'}, {'id': '2', 'url': 'http://image.bloggeng.com/shengdan.png'}],
        pushContent: '大家好',
        wordCount: 100,
        hasInputCount: ''
      }
    },
    methods: {
      pushTopic () {
        console.log('发布话题', this.pushContent)
      },
      inputEvent (e) {
        // this.hasInputCount = e.mp.detail.cursor
        // this.value = e.mp.detail.value
        this.hasInputCount = e.mp.detail.cursor
        // this.$emit('input', e.mp.detail.value)
        // this.throttle(this.queryData, null, 400, e.mp.detail)
      },
      throttle (fn, context, delay, text) {
        clearTimeout(fn.timeoutId)
        fn.timeoutId = setTimeout(function () {
          fn.call(context, text)
        }, delay)
      },
      queryData (e) {
        console.log(e)
        this.hasInputCount = e.cursor
        this.$emit('input', e.value)
      }
    }

  }
</script>

<style scoped>
  .alumni-main{
    background-color: #f4f5f5;
  }
  .topic-edit{
    margin-bottom: 16rpx;
    background-color: #fff;
    position: relative;
    border-radius: 0.048rem;
    box-shadow: 0 2rpx 4rpx 0 rgba(0,0,0,.05);
  }

  .topic-edit-body{
    padding: .20rem .38rem;
    background: #fff;
    position: relative;
    border-radius: 4rpx;
  }

  .edit-bottom{
    padding: .18rem .38rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: -4rpx;
  }

  .edit-toolbar{
    display: -ms-flexbox;
    display: flex;
    color: #007fff;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-pack: justify;
    justify-content: space-between;
    width: 100%;
  }

  .tool{
    display: flex;
    align-content: center;
  }

  .submit{
    display: flex;
  }

  .submit-button{
    opacity: .2;
    cursor: not-allowed;
    padding: 0!important;
    background-color: #027fff;
    height: 64rpx;
    font-size: 30rpx;
    width: 1.44rem;
  }

  .active{
    opacity: 2;
  }

  button{
    -webkit-appearance: none;
    appearance: none;
    background-color: #007fff;
    color: #fff;
    border-radius: 4rpx;
    border: none;
    padding: .12rem 0.28rem;
    outline: none;
    transition: background-color .3s,color .3s;
    cursor: pointer;
  }
  .topic-edit-content{
    position: relative;
    border-radius: 4rpx;
    border: 2rpx solid hsla(0,0%,59%,.2);
    background-color: rgba(226,230,235,.2);
  }

  .edit{
    position: relative;
    font-size: 24rpx;
    word-wrap: break-word;
    resize: none;
    height: 100rpx;
    padding: 10rpx 10rpx;
  }

  .word-counter{
    position: absolute;
    right: 0.24rem;
    bottom: 0.18rem;
    font-size: 26rpx;
    z-index: 1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
    color: #a1a9b3;
  }
</style>
