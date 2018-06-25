<template>
  <div class="container" >
    <div class="title">
      <p>您所在城市</p>
    </div>
    <div class="userinfo">
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
    <!--<a href="/pages/counter/main" class="counter" @click="saveLocation">下一步</a>-->
    <a  class="counter" @click="saveLocation">下一步</a>
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
