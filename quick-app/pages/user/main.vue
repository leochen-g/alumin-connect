<template>
  <div class="user-main">
    <div class="user-content">
      <div class="user-header" @click="goPath('user')">
        <img
          :src="
            userInfo
              ? userInfo.avataUrl
              : 'http://image.bloggeng.com/20190108160710.png'
          "
          class="user-avataurl-img"
          alt=""
        />
        <div class="user-base-info">
          <div class="user-nick-name">
            {{ userInfo ? userInfo.nickName : '昵称' }}
          </div>
          <div class="user-school">
            {{ userInfo ? userInfo.school.graduationTime : '毕业时间' }} @
            {{ userInfo ? userInfo.school.university : '学校' }}
          </div>
        </div>
        <div class="user-edit" v-if="hasAuth">
          编辑 <span class="aliiconfont">&#xe60f;</span>
        </div>
      </div>
      <div v-if="hasAuth">
        <div class="user-block">
          <div class="user-info-item" @click="goPath('school')">
            <div class="aliiconfont info-item-icon">&#xe680;</div>
            <div class="info-item-title">院校</div>
            <div class="aliiconfont user-edit-icon">&#xe60f;</div>
          </div>
          <div class="user-info-item no-border" @click="goPath('company')">
            <div class="aliiconfont info-item-icon">&#xe615;</div>
            <div class="info-item-title">公司</div>
            <div class="aliiconfont user-edit-icon">&#xe60f;</div>
          </div>
        </div>
        <div class="user-block">
          <div class="user-info-item" @click="goUserTopic()">
            <div class="aliiconfont info-item-icon">&#xe6e8;</div>
            <div class="info-item-title">话题</div>
            <div class="aliiconfont user-edit-icon">&#xe60f;</div>
          </div>
          <div class="user-info-item no-border" @click="goUserMessage()">
            <div class="aliiconfont info-item-icon">&#xe6a9;</div>
            <div class="info-item-title">
              消息
              <span class="messageCount" v-if="msgCount">{{
                msgCount ? msgCount : ''
              }}</span>
            </div>
            <div class="aliiconfont user-edit-icon">&#xe60f;</div>
          </div>
        </div>
        <div class="user-block">
          <div class="user-info-item no-border" @click="goSetting()">
            <div class="aliiconfont info-item-icon">&#xe642;</div>
            <div class="info-item-title">设置</div>
          </div>
        </div>
      </div>
      <div v-if="!hasAuth">
        <div class="login-main">
          <button
            open-type="getUserInfo"
            type="primary"
            size="default"
            class="login-btn"
            @getuserinfo="onGotUserInfo"
          >
            登录
          </button>
          <div class="login-tips">登陆后即刻开启校友生活</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalStore from '../../store/global-store';
import { getUserInfo, getUserUnReadMessageCount, login } from '../../http/api';
export default {
  name: 'index',
  components: {},
  computed: {
    hasAuth() {
      return globalStore.state.hasAuth;
    },
    userInfo() {
      return globalStore.state.userInfo;
    },
  },
  data() {
    return {
      msgCount: '',
    };
  },
  onLoad() {
    // 小程序钩子
    wx.setNavigationBarTitle({
      title: '个人中心',
    });
    if (this.hasAuth) {
      this.getUserInfo();
    }
  },
  onShow() {
    if (this.hasAuth) {
      this.getUnReadCount();
    }
  },
  methods: {
    getUserInfo() {
      getUserInfo().then((res) => {
        globalStore.commit('updateUserInfo', res.data);
        wx.setStorageSync('hasAuth', true);
        globalStore.commit('updateAuth', true);
        if (res.data.school.university) {
          wx.setStorageSync('university', res.data.school.university);
          globalStore.commit('increment', res.data.school.university);
        }
      });
    },
    getUnReadCount() {
      let _this = this;
      getUserUnReadMessageCount().then((res) => {
        _this.msgCount = res.data.count;
      });
    },
    goPath(val) {
      if (this.hasAuth) {
        let url = '../user-edit/main';
        globalStore.commit('updateEditType', val);
        wx.navigateTo({ url });
      } else {
        wx.showModal({
          content: '登录后即可查看',
          confirmText: '确认',
          success: function (res) {},
        });
      }
    },
    goUserTopic() {
      let url = '../user-topic/main';
      wx.navigateTo({ url });
    },
    goUserMessage() {
      globalStore.commit('updateCurrentTab', '1');
      let url = '../user-message/main';
      wx.navigateTo({ url });
    },
    goSetting() {
      let url = '../user-setting/main';
      wx.navigateTo({ url });
    },
    // 登录
    onGotUserInfo: function (e) {
      let _this = this;
      if (e.mp.detail.userInfo) {
        globalStore.commit('updateNickName', e.mp.detail.userInfo.nickName);
        wx.setStorageSync('nickName', e.mp.detail.userInfo.nickName);
        wx.login({
          timeout: 3000,
          success: (res) => {
            const code = res.code;
            const { encryptedData, iv } = e.mp.detail;
            let req = {
              code: code,
              encryptedData: encryptedData,
              iv: iv,
            };
            login(req).then((res) => {
              wx.setStorageSync('token', res.data.token);
              _this.getUserInfo();
              _this.getUnReadCount();
            });
          },
        });
      } else {
        wx.showModal({
          title: '温馨提示',
          showCancel: true,
          content: '为了您更好的体验,请先同意授权',
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: function (res) {
                  if (res.authSetting['scope.userInfo']) {
                    console.log('谢谢授权');
                  } else {
                    console.log('还是没有授权');
                  }
                },
              });
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user-main {
  position: fixed;
  background-color: #f2f2f2;
  width: 100%;
  height: 100%;
}
.user-content {
  padding-top: 40rpx;
}
.user-header {
  background-color: #ffffff;
  display: flex;
  position: relative;
  justify-content: flex-start;
  padding: 20rpx 20rpx;
}
.user-avataurl-img {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
}
.user-base-info {
  flex: 1;
  padding: 20rpx;
}
.user-edit {
  height: 120rpx;
  line-height: 120rpx;
  color: $grayColor;
}
.user-edit-icon {
  color: $grayColor;
}
.user-nick-name {
  font-size: 28rpx;
}
.user-school {
  color: $grayColor;
}
.user-block {
  margin-top: 40rpx background-color $whiteColor;
}
.user-info-item {
  display: flex;
  justify-content: flex-start;
  padding: 20rpx;
  height: 60rpx;
  line-height: 60rpx;
  background-color: $whiteColor;
  border-bottom: 2rpx solid #e1e1e1;
}
.no-border {
  border-bottom: none !important;
}
.info-item-icon {
  font-size: 40rpx;
  color: $themeColor;
}
.info-item-title {
  flex: 1;
  padding-left: 40rpx;
  font-size: 28rpx;
}
.login-main {
  padding-top: 200rpx;
  height: 400rpx;
  width: 100%;
  text-align: center;
}
.login-btn {
  width: 400rpx;
}
.login-tips {
  padding-top: 20rpx;
  color: #b5b5b5;
  text-align: center;
}
.messageCount {
  text-align: center;
  display: inline-block;
  background-color: $messageBackgroundColor;
  color: $whiteColor;
  width: 40rpx;
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 40rpx;
}
</style>
