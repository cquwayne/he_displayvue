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
import HomeIndex from "../components/HomeIndex";

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/homeIndex',
    //   name: 'HomeIndex',
    //   component: HomeIndex
    // },
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
