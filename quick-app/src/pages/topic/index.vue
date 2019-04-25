<template>
  <div class="alumni-main">
    <!--轮播图-->
    <swiper class="swiper" indicator-dots="true" autoplay="true" interval="5000" duration="1000" circular="true">
      <block v-for="(item, index) in swiperList" :index="index" :key="key">
        <swiper-item  >
          <image @tap="previewImg" :src="item.screenshot" :data-src="item.screenshot" class="slide-image" mode="aspectFill"/>
          <div v-if="item.type === 'public'&&item.position === 'top'" class="swiper-text"><span class="swiper-university">《校友来了》</span><br>祝{{university}}全体校友<br>{{item.description}}</div>
        </swiper-item>
      </block>
    </swiper>
    <!--<topicSwiper :list="swiperList"/>-->
    <!--发布话题-->
    <topicEdit />
    <lampBanner :systemInfo="systemInfo"/>
    <!--话题列表-->
    <topicItem v-for="item in list" :key="item.id" :todo="item" />
    <div class="init-topic" v-if="list.length<=0&&!authLocation">
      <div class="init-tips">你所在城市的圈子里还没校友说话<br>快来活跃气氛</div>
    </div>
    <div class="to-location-setting" v-if="authLocation">
      <button  class="goSetting" open-type="openSetting">前往授权</button>
      <div class="location-tips">本小程序是基于位置为你提供同城校友话题，请到设置中打开位置授权，谢谢</div>
    </div>
  </div>

</template>

<script>
  import topicEdit from '../../components/topicEdit'
  import topicItem from '../../components/topicItem'
  import lampBanner from '../../components/lampBanner'
  import globalStore from '../../store/global-store'
  import Bus from '../../bus'
  import {getTopicList, getUserLocation, getBannerList, getSystemMessage} from '../../http/api'
  export default {
    name: 'index',
    components: {
      topicEdit, topicItem, lampBanner
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
      },
      hasAuth () {
        return globalStore.state.hasAuth
      },
      systemInfo () {
        return globalStore.state.systemMessage
      },
      shareImg () {
        return globalStore.state.shareImg
      },
      shareDetail () {
        return globalStore.state.shareDetail
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
        topicCount: 0,
        authLocation: false
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
        title: this.university + '圈子'
      })
      this.start = 0
      this.limit = 10
      if (this.hasAuth) {
        this.validate()
      } else {
        wx.showModal({
          title: '提示',
          content: '登录后即可查看校友圈子',
          showCancel: false,
          success (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../user/main'
              })
            }
          }
        })
      }
    },
    async onPullDownRefresh () { // 下拉刷新
      this.initPage()
      this.getTopicList()
      this.getSwiperList()
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
    onShareAppMessage (options) {
      return {
        title: this.shareDetail,
        path: '/pages/user/main',
        imageUrl: this.shareImg,
        success: function (res) {
          console.log('分享成功')
        }
      }
    },
    methods: {
      previewImg (e) { // 图片预览
        console.log('tupian', e)
        var current = e.currentTarget.dataset.src
        wx.previewImage({
          current: current,
          urls: [current]
        })
      },
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
                _this.authLocation = true
                // _this.openConfirm()
              } else {
                _this.authLocation = false
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
          console.log('鉴权', _this.hasAuth)
          if (_this.hasAuth) {
            _this.getSwiperList()
            _this.getSystemInfo()
            _this.getTopicList()
          } else {
            wx.showModal({
              title: '提示',
              content: '登录后即可查看校友圈子',
              showCancel: false,
              success (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../user/main'
                  })
                }
              }
            })
          }
        }
      },
      getSwiperList () {
        let _this = this
        let req = {
          location: _this.location,
          university: _this.university || '无'
        }
        getBannerList(req).then(res => {
          _this.swiperList = []
          _this.swiperList = res.data.list
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
          if (_this.hasAuth) {
            _this.getTopicList()
            _this.getSystemInfo()
            _this.getSwiperList()
          } else {
            wx.showModal({
              title: '提示',
              content: '登录后即可查看校友圈子',
              showCancel: false,
              success (res) {
                if (res.confirm) {
                  wx.switchTab({
                    url: '../user/main'
                  })
                }
              }
            })
          }
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
      getSystemInfo () {
        getSystemMessage().then(res => {
          globalStore.commit('updateSystemMessage', res.data.list)
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
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .alumni-main{
    background-color: #f4f5f5;
  }
  .init-topic{
    position: relative;
    display: flex;
    height: 400rpx;
    width: 100%;
    justify-content: center;
    background-color: #fff;
  }
  .to-location-setting{
    position: relative;
    height: 400rpx;
    width: 100%;
    background-color: #fff;
    padding-top 200rpx
  }
  .goSetting{
    display block
    width 300rpx
    border-radius 8rpx
    height 60rpx
    line-height 60rpx
    padding 0
    font-size 24rpx
  }
  .location-tips{
    text-align center
    width 500rpx
    margin 20rpx auto
    color grayColor
  }
  .init-tips{
    font-size: 28rpx;
    text-align center
    padding 20rpx 40rpx
    color: #c8c8c8;
  }
  .love{
    width: 100rpx;
    height: 100rpx;
    position: absolute;
    z-index: 999;
    top: -100rpx;
  }
  .scroll-icon{
    padding-left: 38rpx;
    background-color: whiteColor;
    position: relative;
    z-index: 2;
    font-size 32rpx
    padding-right 20rpx
  }
  .scroll_view_border{
    position: relative;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    background: whiteColor;
    height: 40rpx;
    line-height 40rpx
    overflow: hidden;
    margin-bottom: 16rpx;
    padding: 10rpx 0rpx;
  }
    .swiper-text{
      position absolute
      top 35rpx
      color whiteColor
      letter-spacing 6rpx
      width 100%
      margin 0 auto
      text-align center
      word-break break-all
    }
  .swiper{
    flex: 1;
    color: themeColor;
    min-height 300rpx
  }
  .slide-image{
    width: 100%;
    height: 100%;
  }
  .swiper-university{
    font-size 28rpx
  }
</style>
