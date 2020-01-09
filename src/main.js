import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import Vant,{Lazyload} from "vant";
import "vant/lib/index.css";
import waterfall from 'vue-waterfall2'
import axios from 'axios'
import axiosUtil from './axios/AxiosUtil.js' 

Vue.config.productionTip = false
Vue.use(Lazyload);
Vue.use(Vant);
Vue.use(waterfall); 

Vue.prototype.$axios = axios
Vue.prototype.$axiosUtils = axiosUtil

new Vue({
  el:"#app",
  router,
  render: h => h(App),
}).$mount('#app')
