<template>
  <div class="scroll_view_border">
    <div class="scroll-icon">
      <span class="aliiconfont">&#xe617;</span>
    </div>
    <swiper class="swiper" vertical indicator-dots="true" autoplay="true" interval="5000" duration="1000" circular="true">
      <block v-for="(item, index) in systemInfo" :index="index" :key="key" @click="systemInfo(item.id)">
        <swiper-item class="ellipsis">
         {{item.content}}
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
      systemInfo (id) {

      }
    }

  }
</script>

<style scoped>
  .scroll-icon{
    padding-left: 38rpx;
    background-color: #ffffff;
    position: relative;
    z-index: 2;
  }
  .scroll_view_border{
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    background: #ffffff;
    height: 40rpx;
    overflow: hidden;
    margin-bottom: 16rpx;
    padding: 10rpx 0rpx;
  }
  .swiper{
    flex: 1;
    color: #027fff;
  }
</style>
