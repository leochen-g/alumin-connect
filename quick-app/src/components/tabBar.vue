<template>
  <div class="tabberWarp">
    <div class="warp">
      <Item :txt='item.txt' :normalImg="item.normalImg" :activeImg="item.activeImg" :page='item.page' @change='getVal' v-for='item in tabbarDes' :key="index" :sel='selected'>
      </Item>
    </div>
  </div>
</template>
<script>
  import Item from './tabBarItem'
  export default {
    components: {
      Item
    },
    data () {
      return {
        selected: 'topic',
        tabbarDes: [
          {
            txt: '校友足迹',
            page: 'index',
            normalImg: require('../../static/img/foot.png'),
            activeImg: require('../../static/img/foot-active.png')
          },
          {
            txt: '校友圈子',
            page: 'topic',
            normalImg: require('../../static/img/topic.png'),
            activeImg: require('../../static/img/topic-active.png')
          },
          {
            txt: '个人中心',
            page: 'user',
            normalImg: require('../../static/img/user.png'),
            activeImg: require('../../static/img/user-active.png')
          }
        ]
      }
    },
    methods: {
      getVal: function (res) {
        this.selected = res
      }
    }
  }
</script>
<style type="text/css">
  .warp{
    width: 100%;
    border-top: 1px solid #eee;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 0;
  }
  .warp img{
    width: 20px;
    height: 20px;
  }
  .tabberWarp img{
    margin-top: 10px;
    margin-bottom: 5px;

  }
  .tabberWarp{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 5px;
    background: #fff;
  }
</style>
