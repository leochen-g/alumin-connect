<template>
  <div class="container" >
    <div class="schoolMain">
      <div class="school-info">
        <div >
          <p class="title">选 择 院 校</p>
        </div>
        <p class="aliiconfont universityIcon" >&#xe955;</p>
        <div class="userinfo-nickname">
          <p class="university">{{university}}</p>
        </div>
        <div class="university-input">
          <input type="text" v-model="university" disabled placeholder="搜索" class="search-input" @click="toSearch">
        </div>
        <div class="button-finish">
          <button  v-if="university!==''" class="finish"  @click="goCharts">查看足迹</button>
          <button  v-if="university===''" class="finish"  @click="saveTips" >查看足迹</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({nickName: 'nickName', university: 'university', shareImg: 'shareImg', shareDetail: 'shareDetail'})
    },
    data () {
      return {
        city: '',
        location: ''
      }
    },
    created () {
      this.$store.dispatch('wxLogin')
      wx.setNavigationBarTitle({
        title: '校友来了'
      })
    },
    onShareAppMessage (options) {
      return {
        title: this.shareDetail,
        path: '/pages/index/main',
        imageUrl: this.shareImg,
        success: function (res) {
          console.log('分享成功')
        }
      }
    },
    onShow () {
      this.$store.dispatch('getLocation')
    },
    methods: {
      // 更新位置信息
      goCharts: function () {
        const url = '../charts/main'
        wx.navigateTo({ url })
      },
      saveTips () {
        wx.showModal({
          title: '温馨提示',
          showCancel: false,
          content: '请先选择你的院校',
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../search/main'
              })
            }
          }
        })
      },
      toSearch: function () {
        wx.navigateTo({
          url: '../search/main'
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .schoolMain{
    display: flex;
    position: fixed;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: auto;
    box-sizing: border-box;
    background-image: url('https://wechat.xkboke.com/static/img/index-bg.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .title{
    margin-top: 80rpx ;
    font-size: 28rpx;
    color: #ffffff;
  }
  .universityIcon{
    margin-top: 94rpx;
    font-size: 200rpx;
    color: whiteColor
    text-shadow 2rpx 2rpx 10rpx footColor
  }
  .school-info {
    background-color: rgba(0,0,0,0.85);
    height: 1444rpx;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .university{
    margin-top: 85rpx;
    font-size: 36rpx;
    letter-spacing: 6rpx;
    color whiteColor
  }
  .university-input{
    margin: 48rpx auto;
  }
  .button-finish{
    margin-top:100rpx;
  }
  .finish {
    position relative
    width: 260rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 16rpx;
    font-size: 28rpx;
    color whiteColor
    background-color: rgba(04,0e,17,1)
    border 2rpx solid #6dd7fb
    text-shadow:1px 1px 5px footColor
    box-shadow:1px 1px 5px footColor
  }
  .search-input{
    width: 400rpx ;
    border: 2rpx solid #ffffff;
    font-size: 22rpx;
    text-align: center;
    padding: 8rpx 20rpx;
    border-radius: 10rpx;
    color: #aaa;
    box-shadow:1px 1px 5px footColor
  }
</style>
