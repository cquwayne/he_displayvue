import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import SceneModel from '../components/digitalModel/wigdets/SceneModel'
import ModelManage from '../components/digitalModel/ModelManage'
import ProcessManage from "../components/digitalModel/ProcessManage"
import CreateDigitalModel from '../components/digitalModel/CreateDigitalModel'
import BaseDataManage from '../components/sceneInstanceData/BaseDataManage'
import SceneData from '../components/sceneInstanceData/SceneData'
import SceneFrameData from '../components/sceneInstanceData/SceneFrameData'
import SceneDataManage from "../components/sceneInstanceData/SceneDataManage"
import Knowledge from '../components/computeModel/Knowledge'
import ComputeModel from '../components/computeModel/ComputeModel'
import ExcelDisplay from '../components/computeModel/ExcelDisplay'
import DigitalTwinsList from '../components/evaluation/DigitalTwinsList'
import EvaluationDataList from '../components/evaluation/EvaluationDataList'
import EnvAssessment from '../components/evaluation/EnvAssessment'
import SceneMatch from '../components/evaluation/SceneMatch'
import RealTimeMonitor from "../components/realTime/RealTimeMonitor";

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
          path: '/modelManage/:sceneModelId',
          name: 'SceneModel',
          component: SceneModel
        },
        {
          path: '/processManage/',
          name: 'ProcessManage',
          component: ProcessManage
        },
        {
          path: '/createDigitalModel/',
          name: 'CreateDigitalModel',
          component: CreateDigitalModel
        },
        {
          path: '/sceneDataManage',
          name: 'SceneDataManage',
          component: SceneDataManage
        },
        {
          path: '/sceneDataManage/sceneData/:sceneDataId',
          name: 'SceneData',
          component: SceneData
        },
        {
          path: '/sceneDataManage/sceneData/:sceneDataId/inputFrameData/:inputFrameDataId',
          name: 'SceneFrameData',
          component: SceneFrameData
        },
        {
          path: '/baseDataManage',
          name: 'BaseDataManage',
          component: BaseDataManage
        },
        {
          path: '/knowledge',
          name: 'Knowledge',
          component: Knowledge
        },
        {
          path: '/computeModel',
          name: 'ComputeModel',
          component: ComputeModel
        },
        {
          path: '/computeModel/excelDisplay',
          name: 'ExcelDisplay',
          component: ExcelDisplay
        },
        // 何仪项目新增---孪生体模型管理的环境影响评价
        {
          path: '/evaluation/digitalTwinsList',
          name: 'DigitalTwinsList',
          component: DigitalTwinsList
        },
        {
          path: '/evaluation/evaluationDataList',
          name: 'EvaluationDataList',
          component: EvaluationDataList
        },
        {
          path: '/evaluation/envAssessment',
          name: 'EnvAssessment',
          component: EnvAssessment
        },
        {
          path: '/evaluation/sceneMatch',
          name: 'SceneMatch',
          component: SceneMatch
        },
        //何仪新项目新增---数字孪生的实时数据监控
        {
          path: '/realTimeMonitor',
          name: 'RealTimeMonitor',
          component: RealTimeMonitor
        },

      ]
    }
  ]
})
