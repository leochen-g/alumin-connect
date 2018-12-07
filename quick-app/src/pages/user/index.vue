<template>
  <div class="alumni-main">
    <!--轮播图-->
    <topicSwiper :list="swiperList"/>
    <!--发布话题-->
    <topicEdit />
    <!--话题列表-->
    <topicItem v-for="item in list" :key="item.id" :todo="item" />
  </div>
</template>

<script>
  import topicEdit from '../../components/topicEdit'
  import topicSwiper from '../../components/topicSwiper'
  import topicItem from '../../components/topicItem'
  import globalStore from '../../store/global-store'
  import Bus from '../../bus'
  export default {
    name: 'index',
    components: {
      topicSwiper, topicEdit, topicItem
    },
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
    data () {
      return {
        swiperList: [{'id': '1', 'url': 'http://image.bloggeng.com/shengdan.png'}, {'id': '2', 'url': 'http://image.bloggeng.com/shengdan.png'}],
        pushContent: '',
        wordCount: 100,
        hasInputCount: '',
        placeholder: '发布话题',
        list: [],
        commentList: ''
      }
    },
    onReady: function () {
      let _this = this
      _this.getTopicList()
      Bus.$off('getTopicList')
      Bus.$on('getTopicList', function () {
        _this.getTopicList()
      })
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
      },
      pushTopic () {
        console.log('发布话题', this.pushContent)
      },
      inputEvent (e) {
        this.hasInputCount = e.mp.detail.cursor
        // this.$emit('input', e.mp.detail.value)
        // this.throttle(this.queryData, null, 400, e.mp.detail)
      },
      throttle (fn, context, delay, text) {
        clearTimeout(fn.timeoutId)
        fn.timeoutId = setTimeout(function () {
          fn.call(context, text)
        }, delay)
      },
      queryData (e) {
        console.log(e)
        this.hasInputCount = e.cursor
        this.$emit('input', e.value)
      }
    }

  }
</script>

<style scoped>
  .alumni-main{
    background-color: #f4f5f5;
  }
</style>
