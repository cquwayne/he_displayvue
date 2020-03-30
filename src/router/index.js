import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ModelIndex from '../components/model/ModelIndex'
import InstanceIndex from '../components/instance/InstanceIndex'
import Running from '../components/instance/Running'
import Instance from '../components/instance/Instance'
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
      path: '/instances',
      name: 'InstanceIndex',
      component: InstanceIndex
    },
    {
      path: '/instance',
      name: 'Instance',
      component: Instance
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
