import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ModelIndex from '../components/model/ModelIndex'
import TaskIndex from '../components/task/TaskIndex'
import Running from '../components/task/Running'
import Task from '../components/task/Task'
import RuleIndex from '../components/rule/RuleIndex'
import ChainIndex from '../components/chain/ChainIndex'
import DataIndex from '../components/data/DataIndex'
import Influx from '../components/data/Influx'

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
      path: '/tasks',
      name: 'TaskIndex',
      component: TaskIndex
    },
    {
      path: '/task',
      name: 'Task',
      component: Task
    },
    {
      path: '/running',
      name: 'Running',
      component: Running
    },
    {
      path: '/data',
      name: 'DataIndex',
      component: DataIndex
    },
    {
      path: '/influx',
      name: 'Influx',
      component: Influx
    }
  ]
})
