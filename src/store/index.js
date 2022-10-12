import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userName: localStorage.getItem("userName") || "123456464",
    userRole: JSON.parse(localStorage.getItem("userRole") || "[]"),
    token: localStorage.getItem("token") || "",
    
  },
  getters: {},
  mutations: {
    set_token(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    set_userName(state, userName) {
      state.userName = userName;
      localStorage.setItem("userName", userName);
    },
    set_userRole(state, userRole) {
      state.userRole = userRole;
      localStorage.setItem("userRole", JSON.stringify(userRole));
    },
  },
  actions: {},
  modules: {},
});
