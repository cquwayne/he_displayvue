import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Model from '../components/model/Model'
import Task from '../components/task/Task'
import RuleIndex from '../components/rule/RuleIndex'
import ChainIndex from '../components/chain/ChainIndex'
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
      name: 'RuleIndex',
      component: RuleIndex
    },
    {
      path: '/chain',
      name: 'ChainIndex',
      component: ChainIndex
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
