import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    university: wx.getStorageSync('university') || '请选择',
    nickName: wx.getStorageSync('nickName') || '',
    location: wx.getStorageSync('location') || ''
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
    }
  }
})
