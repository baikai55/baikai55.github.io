import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
//css
import "@/assets/css/reset.css";
import "@/assets/css/table_form.scss";

//element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 假数据
import "@/mock";
//
import "@/assets/js/flexible.min.js";

//表格+分页器组件 全局注册
import tableComponentVue from "@/components/table/tableComponent.vue";
import paginationComponentVue from "@/components/table/paginationComponent.vue";
Vue.component("Table", tableComponentVue);
Vue.component("Pagination", paginationComponentVue);

// 进度条
import "nprogress/nprogress.css";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
