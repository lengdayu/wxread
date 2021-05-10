import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
axios.defaults.baseURL='http://localhost:3000'
Vue.prototype.axios=axios;

import qs from 'qs'
Vue.prototype.qs=qs;

//封装全局头组件
import MyheaderDetail from './components/top/MyheaderDetail'
Vue.component('myheader-detail',MyheaderDetail);

// 引入ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
