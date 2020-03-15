import Vue from 'vue'
import Router from 'vue-router'
// import Three from '../components/Three'
import Model from '../components/model/Model'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/model',
      name: 'Model',
      component: Model
    }
  ]
})
