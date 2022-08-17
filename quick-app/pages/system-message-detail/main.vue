<template>
  <div class="message-detail">
    <div class="detail-content">
      <div class="detail-title">{{ selectSystemMessage.title }}</div>
      <div class="detail-updatedTime">{{ updatedTime }}</div>
      <div class="detail-banner">
        <img
          class="detail-img"
          v-bind:src="selectSystemMessage.imgSrc"
          alt=""
        />
      </div>
      <div class="detail-main">
        <wxparser :rich-text="selectSystemMessage.detail" />
      </div>
      <div class="detail-footer">
        <div class="footer-item">
          <div class="reader">阅读 {{ selectSystemMessage.readCount }}</div>
        </div>
        <div class="footer-item">
          <div class="addWechat" @click="clickToCopy()">
            添加校友小助手(点击即可复制微信号)
          </div>
        </div>
      </div>
      <div class="share-message">
        <button class="share-btn" open-type="share">分享</button>
      </div>
    </div>
  </div>
</template>

<script>
import globalStore from '../../store/global-store';

export default {
  name: 'index',
  computed: {
    selectSystemMessage() {
      return globalStore.state.selectSystemMessage;
    },
    updatedTime() {
      let tempDate = new Date(this.selectSystemMessage.updatedAt);
      let year = tempDate.getFullYear();
      let month = tempDate.getMonth() + 1;
      let day = tempDate.getDate();
      let hour = tempDate.getHours();
      let min = tempDate.getMinutes();
      let second = tempDate.getSeconds();
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (min < 10) {
        min = '0' + min;
      }
      if (second < 10) {
        second = '0' + second;
      }
      return (
        year +
        '/' +
        (month > 9 ? month : '0' + month) +
        '/' +
        (day > 9 ? day : '0' + day) +
        ' ' +
        hour +
        ':' +
        min +
        ':' +
        second
      );
    },
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '消息详情',
    });
  },
  data() {
    return {};
  },
  onShareAppMessage(options) {
    return {
      title: '知否，知否，同城校友就差你了!',
      path: '/pages/index/main',
      success: function (res) {
        console.log('分享成功');
      },
    };
  },
  methods: {
    clickToCopy() {
      wx.setClipboardData({
        data: 'CG1210441033',
        success: function (res) {
          wx.showToast({
            title: '复制成功',
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.message-detail {
  background-color: $backGroundColor;
  height: 100%;
  width: 100%;
}
.detail-content {
  padding: 20rpx 30rpx;
}
.detail-title {
  text-align: center;
  font-size: 32rpx;
}
.detail-updatedTime {
  padding: 10rpx 0;
  text-align: left;
  color: $grayColor;
}
.detail-banner {
  width: 100%;
  height: 50%;
}
.detail-img {
  width: 100%;
  height: 360rpx;
}
.detail-main {
  padding: 20rpx 0;
  text-indent: 48rpx;
  font-size: 28rpx;
  line-height: 1.5;
  min-height: 500rpx;
  color: $textColor;
}
.detail-footer {
  display: flex;
  justify-content: space-between;
  margin: 30rpx;
}

.reader {
  color: $grayColor;
}

.share-btn {
  background-color: $themeColor;
  color: $whiteColor;
}

.addWechat {
  color: $themeColor;
}
</style>
