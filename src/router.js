import Vue from "vue";
import VueRouter from 'vue-router'
import Home from "./components/Home.vue";
import Login from "./components/LoginInfo.vue";

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
    routes: [
      { path: "/home",name:"home", component: Home },
      { path: "/login",neme:"login", component: Login }
    ]
  });


