import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import http from "./components/http";
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
// //封装$message到全局不受this影响
// import {Message} from 'element-ui'
// Vue.use(Message);
// Vue.prototype.$message=Message;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
