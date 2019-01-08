<template>
  <div class="message-detail">
    <div class="detail-content">
      <div class="detail-title">{{selectSystemMessage.title}}</div>
      <div class="detail-updatedTime">{{updatedTime}}</div>
      <div class="detail-banner">
        <img class="detail-img" v-bind:src="selectSystemMessage.imgSrc" alt="">
      </div>
      <div class="detail-main">
        <wxparser :rich-text="selectSystemMessage.detail" />
      </div>
    </div>
  </div>
</template>

<script>
  import globalStore from '../../store/global-store'

  export default {
    name: 'index',
    computed: {
      selectSystemMessage () {
        return globalStore.state.selectSystemMessage
      },
      updatedTime () {
        let tempDate = new Date(this.selectSystemMessage.updatedAt)
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
        return year + '/' + (month > 9 ? month : '0' + month) + '/' + (day > 9 ? day : '0' + day) + ' ' + hour + ':' + min + ':' + second
      }
    },
    onShow: function () {
      wx.setNavigationBarTitle({
        title: '消息详情'
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
  .message-detail{
    background-color: backGroundColor;
    height: 100%;
    width: 100%;
  }
    .detail-content{
      padding 20rpx 30rpx
    }
  .detail-title{
    text-align center
    font-size 32rpx
  }
  .detail-updatedTime{
    padding 10rpx 0
    text-align left
    color grayColor
  }
  .detail-banner{
    width 100%
    height 400rpx
  }
  .detail-img{
    width 100%
    height 100%
  }
  .detail-main{
    padding 20rpx 0
    text-indent 48rpx
    font-size 28rpx
    line-height 1.5
    min-height 500rpx
    color textColor
  }
</style>
