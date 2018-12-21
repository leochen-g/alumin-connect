<template>
  <div class="alumni-main">
    <block v-if="donghua">
      <div class="donghhua">
        <image  v-bind:style="{left:left1+'px'}" :animation="animationData1" class='love' src='http://image.bloggeng.com/snow.png'></image>
      </div>
    </block>
    <!--轮播图-->
    <topicSwiper :list="swiperList"/>
    <!--发布话题-->
    <topicEdit />
    <!--话题列表-->
    <topicItem v-for="item in list" :key="item.id" :todo="item" />
    <div class="init-topic" v-if="list.length<=0">
      <div class="init-tips">你所在城市的圈子里还没小伙伴说话，快来活跃气氛</div>
    </div>
  </div>

</template>

<script>
  import topicEdit from '../../components/topicEdit'
  import topicSwiper from '../../components/topicSwiper'
  import topicItem from '../../components/topicItem'
  import globalStore from '../../store/global-store'
  import Bus from '../../bus'
  import {getTopicList, getUserLocation, getBannerList} from '../../http/api'
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
        swiperList: [],
        pushContent: '',
        wordCount: 100,
        hasInputCount: '',
        placeholder: '发布话题',
        list: [],
        start: 0,
        limit: 10,
        currentPage: 1,
        pageNumber: 1,
        topicCount: '',
        hasAuth: wx.getStorageSync('hasAuth'),
        donghua: true,
        left1: Math.floor(Math.random() * 305 + 1),
        animationData1: ''
      }
    },
    onReady: function () {
      let _this = this
      Bus.$off('getTopicList')
      Bus.$on('getTopicList', function () {
        _this.start = 0
        _this.limit = 10
        _this.getTopicList()
      })
    },
    onShow: function () {
      wx.setNavigationBarTitle({
        title: '个人中心'
      })
      this.start = 0
      this.limit = 10
      this.validate()
      this.getSwiperList()
      this.animationChange()
    },
    async onPullDownRefresh () { // 下拉刷新
      this.initPage()
      this.getTopicList()
      this.getSwiperList()
      // wx.showToast({
      //   title: '刷新成功',
      //   icon: 'none',
      //   duration: 2000
      // })
      wx.stopPullDownRefresh()
    },
    onReachBottom () { // 上拉加载
      this.currentPage = this.currentPage + 1
      if (this.currentPage > this.pageNumber) {
        wx.showToast({
          title: '没有更多动态了',
          icon: 'none',
          duration: 1000
        })
        return false
      }
      this.start = (this.currentPage - 1) * this.limit
      this.getTopicList('reach')
    },
    methods: {
      validate () {
        let _this = this
        if (_this.university === '请选择') {
          wx.showModal({
            title: '提示',
            content: '请先选择你的学校',
            showCancel: false,
            success (res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../search/main'
                })
              }
            }
          })
          return false
        }
        if (!_this.location) {
          wx.getSetting({
            success: (res) => {
              if (!res.authSetting['scope.userLocation']) {
                _this.openConfirm()
              } else {
                if (!_this.location) {
                  wx.getLocation({
                    success: (res) => {
                      let local = res.latitude + ',' + res.longitude
                      _this.getUserLocation(local)
                    }
                  })
                }
              }
            }
          })
          return false
        } else {
          _this.getTopicList()
        }
      },
      getSwiperList () {
        let _this = this
        let req = {
          university: _this.university || '无'
        }
        getBannerList(req).then(res => {
          _this.swiperList = []
          _this.swiperList = res.data.list
        })
      },
      openConfirm () {
        let _this = this
        wx.showModal({
          content: '检测到您没打开校友足迹的定位权限，是否去设置打开？',
          confirmText: '确认',
          cancelText: '取消',
          success: function (res) {
            console.log(res)
            // 点击“确认”时打开设置页面
            if (res.confirm) {
              console.log('用户点击确认')
              wx.openSetting({
                success: (res) => {
                }
              })
            } else {
              _this.validate()
              console.log('用户点击取消')
            }
          }
        })
      },
      // 根据经纬度获取用户位置
      getUserLocation (val) {
        const _this = this
        const obj = {
          location: val
        }
        getUserLocation(obj).then(res => {
          _this.city = res.data.city
          globalStore.commit('updateLocation', _this.city)
          wx.setStorageSync('location', _this.city)
          _this.getTopicList()
        })
      },
      initPage () {
        this.start = 0
        this.limit = 10
      },
      getTopicList (type) {
        let _this = this
        let req = {
          university: _this.university,
          location: _this.location,
          start: _this.start,
          limit: _this.limit
        }
        getTopicList(req).then(res => {
          _this.topicCount = res.data.count
          _this.pageNumber = Math.ceil(_this.topicCount / _this.limit)
          if (type) {
            _this.list = _this.list.concat(res.data.list)
          } else {
            _this.currentPage = 1
            _this.list = res.data.list
          }
        })
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
      },
      animationChange () {
        let animation = wx.createAnimation()
        var i = 1
        setTimeout(function () {
          animation.translateY(604).step({duration: 4000})
          let str = ['animationData' + i]
          this[str] = animation.export()
          i++
        }.bind(this), 500)
        if (i < 7) {
          setTimeout(function () {
            this.animationChange()
          }.bind(this), 500)
        } else {
          console.log(22)
          setTimeout(function () {
            this.donghua = false
          }.bind(this), 4500)
        }
      }
    }
  }
</script>

<style scoped>
  .alumni-main{
    background-color: #f4f5f5;
  }
  .init-topic{
    position: relative;
    display: flex;
    height: 400rpx;
    line-height: 400rpx;
    width: 100%;
    justify-content: center;
    background-color: #fff;
  }
  .init-tips{
    font-size: 32rpx;
    color: #c8c8c8;
  }
  .love{
    width: 100rpx;
    height: 100rpx;
    position: absolute;
    top: -100rpx;
  }
</style>
