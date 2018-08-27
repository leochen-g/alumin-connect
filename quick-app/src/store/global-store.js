import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    university: wx.getStorageSync('university') || '请选择'
  },
  mutations: {
    increment: (state, n) => {
      state.university = n
    }
  }
})
