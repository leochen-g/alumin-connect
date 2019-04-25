<template>
  <div class="alumni-main">
    <!--话题列表-->
    <topicItem v-for="item in list" :key="item.id" :todo="item" />
  </div>
</template>

<script>
  import topicItem from '../../components/topicItem'
  import globalStore from '../../store/global-store'
  import {getUserTopicList} from '../../http/api'
  export default {
    name: 'index',
    components: {
      topicItem
    },
    computed: {
      editType () {
        return globalStore.state.editType
      }
    },
    data () {
      return {
        list: []
      }
    },
    onShow: function () {
      this.getUserTopicList()
      wx.setNavigationBarTitle({
        title: '个人话题'
      })
    },
    async onPullDownRefresh () { // 下拉刷新
      this.getUserTopicList()
      wx.stopPullDownRefresh()
    },
    methods: {
      getUserTopicList () {
        let _this = this
        getUserTopicList().then(res => {
          _this.list = res.data.list
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .alumni-main{
    background-color: #f4f5f5;
    height: 100%;
    width: 100%;
  }
</style>
