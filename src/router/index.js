import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ModelIndex from '../components/model/ModelIndex'
import TaskIndex from '../components/task/TaskIndex'
import Running from '../components/task/Running'
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
      name: 'ModelIndex',
      component: ModelIndex
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
      name: 'TaskIndex',
      component: TaskIndex
    },
    {
      path: '/running',
      name: 'Running',
      component: Running
    },
    {
      path: '/data',
      name: 'Data',
      component: Data
    }
  ]
})
