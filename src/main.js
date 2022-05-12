import Vue from 'vue'
import App from './App.vue'

import router from './router'
// import router from './krouter'

// import store from './store'
import store from './kstore'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
