import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
let store = () => new Vuex.Store({
  state: {
    url: 'http://localhost:8000/',
    token: ''
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    }
  }
})

export default store
