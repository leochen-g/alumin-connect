<template>
  <div class="container" >
    <div class="cityMain">
      <div class="city-info">
        <p class="iconfont location" >&#xe60a;</p>
        <div class="userinfo-nickname">
          <p class="locationCity">{{locationCity}}</p>
        </div>
        <view class="section">
          <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
            <view class="picker reLocation">
              定位错误？
            </view>
          </picker>
        </view>
        <a  class="counter" @click="saveLocation" v-bind:style="{ backgroundColor:tap ? '#729ef6': '#5f95ff'}" @touchstart="tap=1" @touchend="tap=0">下一步</a>
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
  mounted () {
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
    width: 100%;
    height: 1334rpx;
    box-sizing: border-box;
    background-image: url('https://lg-me0h2lia-1256919187.cos.ap-shanghai.myqcloud.com/bg1.jpg');
    background-size: 100%;
  }
  .location{
    margin-top: 200rpx;
    font-size: 240rpx;
    color: #ffffff;
  }
  .city-info {
    background-color: rgba(0,0,0,0.85);
    height: 1334rpx;
    width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .reLocation{
    margin-top: 45rpx;
    font-size: 18rpx;
    color: #c5c5c5;
    text-decoration: underline;
  }
  .locationCity{
    margin-top: 67rpx;
    font-size: 56rpx;
    color: #ffffff;
    letter-spacing: 20rpx;
  }
  .userinfo-nickname {
    color: #aaa;
  }
  .counter {
    width: 166rpx;
    font-size: 28rpx;
    text-align: center;
    display: inline-block;
    margin-top: 287rpx;
    padding: 10rpx 20rpx;
    color: #ffffff;
    background-color: #5f95ff;
    border-radius: 15rpx;
  }
</style>
