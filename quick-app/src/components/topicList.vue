<template>
  <div>
    <topicItem v-for="item in list" :key="item.id" :todo="item" >
    </topicItem>
  </div>
</template>

<script>
  import topicItem from './topicItem'
  import globalStore from '../store/global-store'

  export default {
    name: 'topic-list',
    components: {topicItem},
    computed: {
      university () {
        return globalStore.state.university
      },
      nickName () {
        return globalStore.state.nickName
      },
      location () {
        return globalStore.state.location
      }

    },
    onReady: function () {
      let _this = this
      _this.getTopicList()
    },
    data () {
      return {
        list: [],
        commentList: ''
      }
    },
    methods: {
      getTopicList () {
        let _this = this
        wx.request({
          url: _this.GLOBAL.serverPath + '/api/group/getTopicList',
          method: 'POST',
          data: {
            university: _this.university,
            location: _this.location
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded '
          },
          success: function (res) {
            _this.list = res.data.data.list
          }
        })
      }
    }
  }
</script>

<style scoped>
  .alumni-topic{
    margin-bottom: 8px;
    background-color: #fff;
    border-radius: .2rem;
  }
  .shadow{
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  }
  .activity-item{

  }
</style>
