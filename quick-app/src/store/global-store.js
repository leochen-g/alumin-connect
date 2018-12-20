import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    university: wx.getStorageSync('university') || '请选择',
    nickName: wx.getStorageSync('nickName') || '',
    location: wx.getStorageSync('location') || '',
    hasAuth: wx.getStorageSync('hasAuth') || false,
    editType: '',
    userInfo: '',
    selectTopicId: '58'
  },
  mutations: {
    increment: (state, n) => {
      state.university = n
    },
    updateNickName: (state, n) => {
      state.nickName = n
    },
    updateLocation: (state, n) => {
      state.location = n
    },
    updateAuth: (state, n) => {
      state.hasAuth = n
    },
    updateEditType: (state, n) => {
      state.editType = n
    },
    updateUserInfo: (state, n) => {
      state.userInfo = n
    },
    updateSelectTopicId: (state, n) => {
      state.selectTopicId = n
    }

  }
})
