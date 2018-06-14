<template>
  <div class="container" >

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <div>
      <button  @click = "getWeixinInfo(code)">获取微信信息</button>
      <card :text = "code"></card>
    </div>
    <div >hello:{{weiXinInfo}}</div>
    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

    <div>
      <view class="section">
        <view class="section__title">省市区选择器</view>
        <picker mode="region" @change="bindRegionChange" :value="region" :custom-item="customItem">
          <view class="picker">
            当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
          </view>
        </picker>
      </view>
    </div>
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
      userInfo: {}
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
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (resCode) => {
          this.code = resCode.code
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
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
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
