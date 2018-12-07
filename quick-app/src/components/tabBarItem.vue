<template>
  <div class="itemWarp flex_mid" @click='changePage'>
    <img v-if='!bol' :src="normalImg" >
    <img v-if='bol' :src="activeImg" >
    <span v-text='txt'></span>
  </div>
</template>
<script >
  export default {
    name: 'tab-bar-item',
    props: {
      txt: {
        type: String
      },
      page: {
        type: String
      },
      sel: {
        type: String
      },
      normalImg: {
        required: true
      },
      activeImg: {
        required: true
      }
    },
    computed: {
      bol: function () {
        console.log('值', this.page)
        if (this.sel === this.page) {
          return true
        }
        return false
      }
    },
    methods: {
      changePage: function () { // 点击跳转对应的页面
        wx.navigateTo({url: '../' + this.page + '/main'})
        this.$emit('change', this.page)
      }
    }
  }
</script>
<style type="text/css">
  .itemWarp{
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .itemWarp span{
    font-size: 12px;
  }

</style>
