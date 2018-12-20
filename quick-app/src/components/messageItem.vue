<template>
  <div class="message-main">
    <div class="message-content">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'topicSwiper',
    props: {
      list: {
        required: true
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
