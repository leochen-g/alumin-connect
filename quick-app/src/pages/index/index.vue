<template>
  <div class="container" >
    <div class="title">
      <p>您所在城市</p>
    </div>
    <div class="userinfo" @click="bindViewTap">
      <p class="iconfont location" >&#xe64c;</p>
      <div class="userinfo-nickname">
        <p class="locationCity">{{locationCity}}</p>
      </div>
    </div>
    <div>
      <view class="section">
        <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
          <view class="picker reLocation">
            定位错误，重新选择
          </view>
        </picker>
      </view>
    </div>
    <a href="/pages/counter/main" class="counter">下一步</a>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      customItem: '全部',
      region: ['广东省', '广州市', '海珠区'],
      motto: 'Hello World',
      code: '',
      weiXinInfo: 0,
      userInfo: {},
      locationCity: ''
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
      console.log('picker发送选择改变，携带值为', e.target.value)
      this.region = e.target.value
      this.locationCity = this.region[1]
    },
    getUserInfo () {
      var _this = this
      // 调用登录接口
      wx.login({
        success: (resCode) => {
          this.code = resCode.code
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
          wx.getLocation({
            success: (res) => {
              console.log(res)
              var locationString = res.latitude + ',' + res.longitude
              var tecentKey = 'KLABZ-JL7K5-MI6IN-QFCK4-UHF5H-TKF7H'
              wx.request({
                url: 'http://apis.map.qq.com/ws/geocoder/v1/?location=' + locationString + '&key=' + tecentKey + '&get_poi=1',
                data: {},
                header: {
                  'content-type': 'json'
                },
                success: function (res) {
                  _this.locationCity = res.data.result.address_component.city
                }
              })
            }
          })
        }
      })
    },
    getWeixinInfo (val) {
      var _this = this
      var code = val
      var appId = 'wxa6dca46d80b640ab'
      var secret = 'e6fb338fcfbea033c40b0730a3c0fecf'
      wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
        data: {},
        header: {
          'content-type': 'json'
        },
        success: function (res) {
          _this.weiXinInfo = res.data.openid
          console.log('openid为' + res.data.openid)
        }
      })
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
  .location{
    font-size: 120px;
    color: #d4237a;
  }
  .userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  }
  .reLocation{
    margin-top: 10px;
    font-size: 13px;
    color: #FF9800;
  }
.locationCity{
  margin-top: 20px;
  font-size: 40px;
  letter-spacing: 10px;
}
.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 50px auto;
  padding: 5px 10px;
  color: black;
  border: 1px solid #FF9800;
  border-radius: 5px;
}
</style>
