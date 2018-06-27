<template>
  <div class="container" >
    <div class="cityMain">
      <div class="city-info">
        <div class="title">
          <p>您所在城市</p>
        </div>
        <p class="iconfont location" >&#xe64c;</p>
        <div class="userinfo-nickname">
          <p class="locationCity">{{locationCity}}</p>
        </div>
        <view class="section">
          <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
            <view class="picker reLocation">
              定位错误，重新选择
            </view>
          </picker>
        </view>
        <a  class="counter" @click="saveLocation">下一步</a>
      </div>
    <!--<a href="/pages/counter/main" class="counter" @click="saveLocation">下一步</a>-->
    </div>
  </div>
</template>

<script>
import card from '@/components/card'
export default {
  data () {
    return {
      customItem: '全部',
      region: ['', '', ''],
      motto: 'Hello World',
      code: '',
      openId: '',
      userInfo: {},
      locationCity: '定位中'
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    bindRegionChange: function (e) {
      this.region = e.target.value
      this.locationCity = this.region[1]
    },
    // 获取用户基本信息
    getUserInfo () {
      var _this = this
      // 调用登录接口
      wx.login({
        success: (resCode) => {
          this.code = resCode.code
          this.getOpenId(resCode.code)
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
              console.log(res)
            }
          })
          wx.getLocation({
            success: (res) => {
              var location = res.latitude + ',' + res.longitude
              _this.getUserLocation(location)
            }
          })
        }
      })
    },
    // 获取用户openid
    getOpenId (val) {
      var _this = this
      wx.request({
        url: this.GLOBAL.serverPath + '/api/user/openid',
        method: 'POST',
        data: {
          code: val
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded '
        },
        success: function (res) {
          console.log('openid为', res.data)
          _this.openId = res.data.data.openid
          wx.setStorageSync('openId', _this.openId)
          _this.saveUserInfo(_this.userInfo, res.data.data.openid)
        }
      })
    },
    // 根据经纬度获取用户位置
    getUserLocation (val) {
      var _this = this
      wx.request({
        url: this.GLOBAL.serverPath + '/api/user/getLocation',
        method: 'GET',
        data: {
          location: val
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log(res)
          _this.region = res.data.data
          _this.locationCity = res.data.data[1]
        }
      })
    },
    // 保存用户基本信息
    saveUserInfo (obj, oid) {
      wx.request({
        url: this.GLOBAL.serverPath + '/api/user/save',
        method: 'POST',
        data: {
          nickName: obj.nickName,
          avatarUrl: obj.avatarUrl,
          country: obj.country,
          gender: obj.gender,
          openid: oid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded '
        },
        success: function (res) {
          console.log('保存成功')
        }
      })
    },
    // 保存用户位置和省份
    saveLocation () {
      var _this = this
      wx.request({
        url: this.GLOBAL.serverPath + '/api/user/update',
        method: 'POST',
        data: {
          oid: _this.openId,
          location: _this.locationCity,
          pid: _this.getPid(_this.region[0]),
          university: ''
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded '
        },
        success: function (res) {
          const url = '../school/main'
          wx.navigateTo({ url })
          console.log('保存成功')
        }
      })
    },
    getPid (val) {
      return this.GLOBAL.provinceMap[val]
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style scoped>
  .cityMain {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 750rpx;
    height: 1334rpx;
    padding: 20rpx 0;
    box-sizing: border-box;
    background-image: url('https://i.niupic.com/images/2018/06/27/5xPG.jpeg');
    background-size: 100%;
  }
  .location{
    font-size: 240rpx;
    color: #FF9800;
  }
  .title{
    color: #aaa;
  }
  .city-info {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .reLocation{
    margin-top: 20rpx;
    font-size: 24rpx;
    color: #FF9800;
  }
  .locationCity{
    margin-top: 40rpx;
    font-size: 80rpx;
    letter-spacing: 20rpx;
  }
  .userinfo-nickname {
    color: #aaa;
  }
  .counter {
    display: inline-block;
    margin: 100rpx auto;
    padding: 10rpx 20rpx;
    color: #FF9800;
    border: 2rpx solid #FF9800;
    border-radius: 10rpx;
  }
</style>
