import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Model from '../components/model/Model'
import Task from '../components/task/Task'
import Rule from '../components/rule/Rule'
import Data from '../components/data/Data'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/model',
      name: 'Model',
      component: Model
    },
    {
      path: '/rule',
      name: 'Rule',
      component: Rule
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    },
    {
      path: '/data',
      name: 'Data',
      component: Data
    }
  ]
})
