<template>
  <div>
    <div class="switch-tab">
      <div
        class="switch-item"
        :class="{ active: currentTab === '1' }"
        @click="clickTab('1')"
      >
        个人消息
      </div>
      <div
        class="switch-item"
        :class="{ active: currentTab === '2' }"
        @click="clickTab('2')"
      >
        系统消息
      </div>
    </div>
    <div class="message" v-if="currentTab === '1'">
      <messageItem
        v-for="(item, index) in userMessage"
        :key="item.id"
        :todo="item"
        :index="index"
      />
      <div class="no-message" v-if="userMessage.length < 1">
        <div class="no-message-main">
          <div class="aliiconfont no-message-icon">&#xe637;</div>
          <span>暂无消息</span>
        </div>
      </div>
    </div>
    <div class="message" v-if="currentTab === '2'">
      <systemMessageItem
        v-for="(item, index) in systemMessage"
        :key="item.id"
        :todo="item"
        :index="index"
      />
      <div class="no-message" v-if="systemMessage.length < 1">
        <div class="no-message-main">
          <div class="aliiconfont no-message-icon">&#xe637;</div>
          <span>暂无消息</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import globalStore from '../../store/global-store';
import messageItem from '../../components/messageItem';
import systemMessageItem from '../../components/systemMessageItem';
import { getUserMessage, getSystemMessage } from '../../http/api';
export default {
  name: 'index',
  components: {
    messageItem,
    systemMessageItem,
  },
  computed: {
    userMessage() {
      return globalStore.state.userMessage;
    },
    systemMessage() {
      return globalStore.state.systemMessage;
    },
    currentTab() {
      return globalStore.state.currentTab;
    },
  },
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '消息通知',
    });
    this.getUserMessage();
    this.getSystemMessage();
  },
  async onPullDownRefresh() {
    // 下拉刷新
    this.getUserMessage();
    wx.stopPullDownRefresh();
  },
  data() {
    return {};
  },
  methods: {
    getUserMessage() {
      getUserMessage().then((res) => {
        globalStore.commit('updateUserMessage', []);
        globalStore.commit('updateUserMessage', res.data.list);
      });
    },
    getSystemMessage() {
      getSystemMessage().then((res) => {
        globalStore.commit('updateSystemMessage', []);
        globalStore.commit('updateSystemMessage', res.data.list);
      });
    },
    clickTab(val) {
      globalStore.commit('updateCurrentTab', val);
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  padding: 100rpx 30rpx 10rpx 30rpx;
}
.no-message {
  width: 100%;
  height: 400rpx;
  vertical-align: middle;
}
.no-message-main {
  margin: 0 auto;
  padding-top: 180rpx;
  text-align: center;
  color: $grayColor;
}
.no-message-icon {
  font-size: 100rpx;
}
.switch-tab {
  position: fixed;
  z-index: 2;
  background-color: $whiteColor;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 2rpx solid $grayColor;
  flex-flow: row;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
}

.switch-item {
  width: 50%;
  color: $textColor;
}

.active {
  color: themeColor;
  border-bottom: 4rpx solid $themeColor;
}
</style>
