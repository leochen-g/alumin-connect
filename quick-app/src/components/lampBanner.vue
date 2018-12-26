<template>
  <div class="scroll_view_border">
    <div class="scroll-icon">
      <span class="aliiconfont">&#xe617;</span>
    </div>
    <swiper @click="systemMessage()" class="swiper" vertical indicator-dots="true" autoplay="true" interval="5000" duration="1000" circular="true">
      <block v-for="(item, index) in systemInfo" :index="index" :key="key">
        <swiper-item class="ellipsis lampContent">
         {{item.title}}
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
  export default {
    name: 'lampBanner',
    props: {
      systemInfo: {
        required: true
      }
    },
    data () {
      return {
        messageInfo: ''
      }
    },
    methods: {
      systemMessage () {
        const url = '../system-message/main'
        wx.navigateTo({ url })
      }
    }

  }
</script>

<style lang="stylus" scoped>
  .scroll-icon{
    padding-left: 38rpx;
    background-color: whiteColor;
    position: relative;
    z-index: 2;
    font-size 32rpx
    padding-right 20rpx
  }
  .scroll_view_border{
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    background: whiteColor;
    height: 40rpx;
    line-height 40rpx
    overflow: hidden;
    margin-bottom: 16rpx;
    padding: 10rpx 0rpx;
  }
  .swiper{
    flex: 1;
    color: themeColor;
  }
</style>
