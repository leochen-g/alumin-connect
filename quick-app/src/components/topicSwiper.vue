<template>
  <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000" circular="true">
    <block v-for="(item, index) in list" :index="index" :key="key">
      <swiper-item  @tap="previewImg">
        <image :src="item.screenshot" :data-src="item.screenshot" class="slide-image" mode="aspectFill"/>
      </swiper-item>
    </block>
  </swiper>
</template>

<script>
  export default {
    name: 'topicSwiper',
    props: {
      list: {
        required: true
      }
    },
    method: {
      timeStart () {
        console.log('start')
      },
      timeEnd () {
        console.log('end')
      },
      previewImg (e) {
        var current = e.currentTarget.dataset.src
        wx.previewImage({
          current: current,
          urls: ''
        })
        console.log('tupian', e)
      }
    }
  }
</script>

<style scoped>
  .slide-image{
    width: 100%;
    height: 100%;
  }
</style>
