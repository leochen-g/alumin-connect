<template>
  <div class="alumni-main">
    <!--话题列表-->
    <topicItem v-for="item in list" :key="item.id" :todo="item" />
  </div>
</template>

<script>
  import topicItem from '../../components/topicItem'
  import globalStore from '../../store/global-store'
  import {getTopicById} from '../../http/api'
  export default {
    name: 'index',
    components: {
      topicItem
    },
    computed: {
      selectTopicId () {
        return globalStore.state.selectTopicId
      }
    },
    data () {
      return {
        list: []
      }
    },
    onShow: function () {
      wx.setNavigationBarTitle({
        title: '话题详情'
      })
      let _this = this
      _this.getTopicById()
    },
    methods: {
      getTopicById () {
        let _this = this
        _this.list = []
        let req = {
          topicId: _this.selectTopicId
        }
        getTopicById(req).then(res => {
          _this.list = [res.data]
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .alumni-main{
    position: fixed;
    background-color: #f4f5f5;
    height: 100%;
    width: 100%;
  }
</style>
