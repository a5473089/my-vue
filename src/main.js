import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import Vant,{Lazyload} from "vant";
import "vant/lib/index.css";
import waterfall from 'vue-waterfall2'
import axios from 'axios'
import imgAxiosUtil from './axios/ImgAxiosUtil.js' 
import videoAxiosUtil from './axios/VideoAxiosUtil.js' 
import VueTouch from 'vue-touch'

import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
 
Vue.use(VideoPlayer)
Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false
Vue.use(Lazyload);
Vue.use(Vant);
Vue.use(waterfall); 

Vue.prototype.$axios = axios
Vue.prototype.$videoAxiosUtils = videoAxiosUtil
Vue.prototype.$imgAxiosUtils = imgAxiosUtil

new Vue({
  el:"#app",
  router,
  render: h => h(App),
}).$mount('#app')
