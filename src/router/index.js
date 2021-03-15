import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import ModelManage from '../components/model/ModelManage'
import Attribute from '../components/model/Attribute'
import ProcessManage from '../components/process/ProcessManage'
import Process from '../components/monitor/Process'
import Realtime from '../components/monitor/Realtime'
import Prediction from '../components/monitor/Prediction'
import SceneModel from '../components/model/SceneModel'
import FlowMain from '../components/process/FlowMain'
// import DateChart from '../components/monitor/widgets/DateChart'
import Knowledge from '../components/monitor/Knowledge'
// import ModelObj from "_vue-3d-model@1.3.1@vue-3d-model";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/modelManage',
          name: 'ModelManage',
          component: ModelManage
        },
        {
          path: '/flowMain/',
          name: 'FlowMain',
          component: FlowMain
        },
        {
          path: '/modelManage/:sceneModelId',
          name: 'SceneModel',
          component: SceneModel
        },
        {
          path: '/attribute',
          name: 'Attribute',
          component: Attribute
        },
        {
          path: '/processManage',
          name: 'ProcessManage',
          component: ProcessManage
        },
        {
          path: '/prediction',
          name: 'Prediction',
          component: Prediction
        },
        {
          path: '/knowledge',
          name: 'Knowledge',
          component: Knowledge
        },
        {
          path: '/process',
          name: 'Process',
          component: Process
        },
        {
          path: '/realtime',
          name: 'Realtime',
          component: Realtime,
          children: [
            // {
            //   path: '',
            //   name: 'DateChart',
            //   component: DateChart
            // }
          ]
        }
      ]
    }
  ]
})
