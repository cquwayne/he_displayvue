import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Model from '../components/model/Model'
import ModelManage from "../components/model/ModelManage";
import Attribute from "../components/attribute/Attribute";
import Monitor from "../components/monitor/Monitor";
import Process from "../components/monitor/Process";
import Realtime from "../components/monitor/Realtime";
import Prediction from "../components/monitor/Prediction";

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
      component: Model,
      children: [
        {
          path: '/modelManage',
          name: 'ModelManage',
          component: ModelManage
        }
      ]
    },
    {
      path: '/attribute',
      name: 'Attribute',
      component: Attribute,
      children: [
        {
          path: '/process',
          name: 'Process',
          component: Process
        },
        {
          path: '/realtime',
          name: 'Realtime',
          component: Realtime
        },
        {
          path: '/prediction',
          name: 'Prediction',
          component: Prediction
        }
      ]
    },
    {
      path: '/monitor',
      name: 'Monitor',
      component: Monitor,
      children: [
        {
          path: '/process',
          name: 'Process',
          component: Process
        },
        {
          path: '/realtime',
          name: 'Realtime',
          component: Realtime
        },
        {
          path: '/prediction',
          name: 'Prediction',
          component: Prediction
        }
      ]
    }
  ]
})
