import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from './kvuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // state 应该是响应式对象
  state: {
    counter: 0
  },
  getters: {
    doubleCounter: state => {
      return state.counter * 2
    }
  },
  mutations: {
    // state从何而来
    add(state){
      state.counter++
    }
  },
  actions: {
    // 上下文从何而来，长什么样
    add({commit}){
      setTimeout(() => {
        commit('add')
      }, 1000)
    }
  },
  modules: {
  }
})
