import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: sessionStorage.getItem('userName') || '',
    userRole: JSON.parse(sessionStorage.getItem('userRole') || '[]'),
    token: sessionStorage.getItem('token') || "",
  },
  getters: {
  },
  mutations: {
    set_token(state, token) {
      state.token = token
      sessionStorage.setItem('token', token)
    },
    set_userName(state, userName) {
      state.userName = userName
      sessionStorage.setItem('userName', userName)
    },
    set_userRole(state, userRole) {
      state.userRole = userRole
      sessionStorage.setItem('userRole', JSON.stringify(userRole))
    },
  },
  actions: {
  },
  modules: {
  }
})
