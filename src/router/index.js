import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ModelManage from "../components/model/ModelManage";
import Attribute from "../components/attribute/Attribute";
import Process from "../components/monitor/Process";
import Realtime from "../components/monitor/Realtime";
import Prediction from "../components/monitor/Prediction";
import SceneModel from "../components/model/SceneModel";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/modelManage',
          name: 'ModelManage',
          component: ModelManage
        },
        {
          path: '/attribute',
          name: 'Attribute',
          component: Attribute
        },
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
