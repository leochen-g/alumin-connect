<template>
  <div class="container" >
    <div class="title">
      <p>选择院校</p>
    </div>
    <div class="userinfo" @click="bindViewTap">
      <p class="iconfont universityIcon" >&#xe603;</p>
      <div class="userinfo-nickname">
        <p class="university">{{university}}</p>
      </div>
    </div>
    <div class="search">
      <input type="text" disabled placeholder="搜索" class="search-input" @click="toSearch">
    </div>
    <div>

    </div>
    <a  class="counter">完成</a>
  </div>
</template>

<script>
  import card from '@/components/card'

  export default {
    data () {
      return {
        university: '复旦大学'
      }
    },

    components: {
      card
    },

    methods: {
      toSearch: function () {
        wx.navigateTo({
          url: '../search/main'
        })
      }
    },
    created () {

    }
  }
</script>

<style scoped>
  .universityIcon{
    margin-top: 70px;
    font-size: 100px;
    color: #000000;
  }
  .userinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .university{
    margin-top: 20px;
    font-size: 20px;
    letter-spacing: 3px;
  }
  .userinfo-nickname {
    color: #aaa;
  }
  .counter {
    display: inline-block;
    margin: 50px auto;
    padding: 5px 10px;
    color: black;
    border: 1px solid #FF9800;
    border-radius: 5px;
  }
  .search{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .search-input{
    margin-top: 20px;
    border: 1px solid #000000;
    padding: 4px 10px;
    border-radius: 5px;
  }
</style>
