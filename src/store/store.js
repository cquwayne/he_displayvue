import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
let store = () => new Vuex.Store({
  state: {
    url: 'http://localhost:8000/',
    token: '',
    sceneModelList: JSON.parse(localStorage.getItem('sceneModelList')) || null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setSceneModelList(state,sceneModelList) {
      localStorage.setItem('sceneModelList',JSON.stringify(sceneModelList))
      state.sceneModelList = JSON.parse(localStorage.getItem('sceneModelList'))
    }
  }
})

export default store
