import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import http from "./api/http";
axios.defaults.baseURL = "http://localhost:3000";
Vue.prototype.axios = axios;

import qs from "qs";
Vue.prototype.qs = qs;

//引入封装的axios请求
Vue.prototype.$http = http;

//封装全局头组件
import MyheaderDetail from "./components/top/MyheaderDetail";
Vue.component("myheader-detail", MyheaderDetail);

// 引入ElementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 全局前置守卫
router.beforeEach((to, from, next) => {
  let statelogin = sessionStorage.getItem("userinfo"); //验证登录状态
  // console.log(statelogin);
  if (statelogin || to.path=="/regist") {
    //判断是否登录
    next();
  } else {
    if (to.path !== "/login") {
      next({ path: "/login" });
    } else {
      next();
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
