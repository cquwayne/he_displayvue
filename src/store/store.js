import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    root: 'http://localhost:8000/',
    // root: 'http://172.28.11.174:8000/',
    token: '',
    sceneModelList: JSON.parse(localStorage.getItem('sceneModelList')) || null,
    objectList: JSON.parse(localStorage.getItem('objectList')) || null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
    },
    setSceneModelList(state,sceneModelList) {
      localStorage.setItem('sceneModelList',JSON.stringify(sceneModelList))
      state.sceneModelList = JSON.parse(localStorage.getItem('sceneModelList'))
    },
    setObjectList(state,objectList) {
      localStorage.setItem('objectList',JSON.stringify(objectList))
      state.objectList = JSON.parse(localStorage.getItem('objectList'))
    }
  }
})
