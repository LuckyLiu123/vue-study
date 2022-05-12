import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from './kvue-router'
import HomeView from '../views/HomeView.vue'

//引入vueRouter插件
// use方法将来会调用install方法，VueRouter里面必须实现一个静态的 install 方法
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
