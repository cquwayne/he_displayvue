import Vue from 'vue'
import Router from 'vue-router'
// import Three from '../components/Three'
import ModelViewMain from '../components/model/ModelViewMain'
import ModelIndex from '../components/model/ModelIndex'
import ModelDetail from '../components/model/ModelDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ModelViewMain,
      children: [
        {
          path: '',
          name: 'ModelIndex',
          component: ModelIndex
        },
        {
          path: ':id',
          name: 'ModelDetail',
          component: ModelDetail
        }
      ]
    }
  ]
})
