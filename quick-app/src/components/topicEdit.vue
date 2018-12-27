<template>
  <div class="topic-edit">
    <div class="topic-edit-body">
      <div class="topic-edit-content">
        <label>
          <textarea maxlength="100" :placeholder="placeholder" class="edit-content edit" v-model="topicContent" @input="inputEvent"></textarea>
        </label>
        <span class="word-counter">{{wordCount-hasInputCount}}</span>
      </div>
    </div>
    <div class="edit-bottom">
      <div class="edit-toolbar">
        <div class="tool"></div>
        <div class="submit">
          <button class="submit-button" v-if="!topicContent">发布</button>
          <button class="submit-button active" v-if="topicContent" @click="addTopic">发布</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Bus from '../bus'
  import {addTopic} from '../http/api'

  export default {
    name: 'topic-edit',
    onShow: function () {
      let _this = this
      _this.nickName = wx.getStorageSync('nickName')
      _this.openId = wx.getStorageSync('openId')
      _this.location = wx.getStorageSync('location')
      _this.university = wx.getStorageSync('university')
      _this.hasAuth = wx.getStorageSync('hasAuth')
    },
    data () {
      return {
        topicContent: '',
        placeholder: '发表话题',
        wordCount: 100,
        hasInputCount: '',
        nickName: wx.getStorageSync('nickName'),
        openId: wx.getStorageSync('openId'),
        location: wx.getStorageSync('location'),
        university: wx.getStorageSync('university'),
        hasAuth: wx.getStorageSync('hasAuth')
      }
    },
    methods: {
      authCheck () {
        let _this = this
        if (_this.hasAuth) {
          return true
        } else {
          wx.showModal({
            content: '校友圈交流需要登录后才可操作',
            confirmText: '确认',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.switchTab({
                  url: '../user/main'
                })
              }
            }
          })
          return false
        }
      },
      inputEvent (e) {
        this.hasInputCount = e.mp.detail.cursor
      },
      addTopic () {
        let _this = this
        let req = {
          nickName: _this.nickName,
          university: _this.university,
          location: _this.location,
          content: _this.topicContent
        }
        if (_this.authCheck()) {
          addTopic(req).then(res => {
            if (res.head.code === 0) {
              _this.topicContent = ''
              Bus.$emit('getTopicList')
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
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
    color: themeColor;
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
    background-color: themeColor;
    height: 64rpx;
    line-height: 64rpx;
    font-size: 30rpx;
    width: 1.44rem;
  }

  .active{
    opacity: 2;
  }

  button{
    -webkit-appearance: none;
    appearance: none;
    background-color: themeColor;
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
