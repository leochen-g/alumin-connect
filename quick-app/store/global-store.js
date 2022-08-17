import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    university: uni.getStorageSync('university') || '请选择',
    nickName: uni.getStorageSync('nickName') || '',
    location: uni.getStorageSync('location') || '',
    hasAuth: uni.getStorageSync('hasAuth') || false,
    editType: '',
    userInfo: '',
    selectTopicId: '',
    userMessage: [],
    systemMessage: [],
    selectSystemMessage: {},
    selectUserId: 'oGT8a0ThGwJOhXcd-eNFC-bl4drQ',
    currentTab: '1',
    shareImg: 'http://image.bloggeng.com/share-img.jpeg',
    shareDetail: '校友来了带你看看同城校友在聊什么？',
  },
  mutations: {
    increment: (state, n) => {
      state.university = n;
    },
    updateNickName: (state, n) => {
      state.nickName = n;
    },
    updateLocation: (state, n) => {
      state.location = n;
    },
    updateAuth: (state, n) => {
      state.hasAuth = n;
    },
    updateEditType: (state, n) => {
      state.editType = n;
    },
    updateUserInfo: (state, n) => {
      state.userInfo = n;
    },
    updateUserInfoItem: (state, n) => {
      if (n.otherKey) {
        state.userInfo[n.otherKey][n.key] = n.value;
      } else {
        state.userInfo[n.key] = n.value;
      }
    },
    updateSelectTopicId: (state, n) => {
      state.selectTopicId = n;
    },
    updateUserMessage: (state, n) => {
      state.userMessage = n;
    },
    updateSystemMessage: (state, n) => {
      state.systemMessage = n;
    },
    updateSelectSystemMessage: (state, n) => {
      state.selectSystemMessage = n;
    },
    updateUserMessageFlag: (state, n) => {
      console.log(n.index);
      state.userMessage[n.index].flag = n.value;
    },
    updateSelectUserId: (state, n) => {
      state.selectUserId = n;
    },
    updateCurrentTab: (state, n) => {
      state.currentTab = n;
    },
  },
});
