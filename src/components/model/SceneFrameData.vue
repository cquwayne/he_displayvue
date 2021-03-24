<!--第三级-->
<template>
  <el-container class="SceneFrameData" style="width: 2000px">
    <el-header>
      <el-card class="hover">
        <div>
          <el-form>
            <el-row>
              <el-form-item class="line">
                <el-col>
                  <el-tag effect="dark" type="success">{{frame.sceneData.title}}</el-tag>
                  <!--                  <el-tag effect="dark" type="success">{{sceneData['title']}}</el-tag>-->
                </el-col>
              </el-form-item>
              <div class="line right">
                <el-form-item class="line">
                  <el-col>
                    <el-input v-model="outputFrameData.collectionDescription" placeholder="请输入工艺描述" class="my-input"></el-input>
                  </el-col>
                </el-form-item>
                <el-form-item class="line">
                  <el-col>
                    <el-button type="text">
                      <i class="el-icon-circle-plus-outline"></i> 新增工艺描述
                    </el-button>
                  </el-col>
              </el-form-item>
              </div>
            </el-row>
          </el-form>
        </div>
        <el-radio-group v-model="outputIndex">
          <el-button type="text" effect="dark" style="margin-right:+20px">
            工艺描述
          </el-button>
          <el-radio :label="index" v-for="(item, index) in frame['outputFrameDataList']?frame['outputFrameDataList']:null" :key="index" style="margin-right:20px" size="small">
            {{item['collectionDescription']}}
          </el-radio>
          <el-button type="primary" plain size="small">编辑</el-button>
          <el-button type="info" plain size="small">删除</el-button>
        </el-radio-group>
      </el-card>
    </el-header>
<!--    <el-main>-->
<!--      <el-tabs v-model="activeName" type="border-card" >-->
<!--        &lt;!&ndash;工艺参数&ndash;&gt;-->
<!--        <el-tab-pane :label="tabPaneList[2].label" name="1" >-->
<!--          <Pane :inputFrameDataId="inputFrameDataId" :list="frame['keyParameterDataList']?frame['keyParameterDataList']:null" :label="tabPaneList[2].label" :tableName="tabPaneList[2].tableName"></Pane>-->
<!--        </el-tab-pane>-->
<!--        &lt;!&ndash;设备&ndash;&gt;-->
<!--        <el-tab-pane :label="tabPaneList[3].label" name="2">-->
<!--          <Pane :inputFrameDataId="inputFrameDataId" :list="frame['deviceDataList']?frame['deviceDataList']:null" :label="tabPaneList[3].label" :tableName="tabPaneList[3].tableName"></Pane>-->
<!--        </el-tab-pane>-->
<!--        &lt;!&ndash;工艺对象/辅料&ndash;&gt;-->
<!--        <el-tab-pane :label="tabPaneList[0].label" name="4">-->
<!--          <Pane :inputFrameDataId="inputFrameDataId" :list="objectList?objectList:null" :label="tabPaneList[0].label" :tableName="tabPaneList[0].tableName"></Pane>-->
<!--        </el-tab-pane>-->
<!--        &lt;!&ndash;辅料&ndash;&gt;-->
<!--        <el-tab-pane :label="tabPaneList[8].label" name="5">-->
<!--          <Pane :inputFrameDataId="inputFrameDataId" :list="assistList?assistList:null" :label="tabPaneList[8].label" :tableName="tabPaneList[8].tableName"></Pane>-->
<!--        </el-tab-pane>-->
<!--        &lt;!&ndash;能源&ndash;&gt;-->
<!--        <el-tab-pane :label="tabPaneList[1].label" name="6">-->
<!--          <Pane :inputFrameDataId="inputFrameDataId" :list="frame['energyDataList']?frame['energyDataList']:null" :label="tabPaneList[1].label" :tableName="tabPaneList[1].tableName"></Pane>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane :label="tabPaneList[5].label" name="7">-->
<!--          <Pane :inputFrameDataId="inputFrameDataId" :outputFrameDataId="frame['outputFrameDataList'].length!==0?frame['outputFrameDataList'][parseInt(outputIndex)]['id']:0"-->
<!--                :list="exhaustGas" :label="tabPaneList[5].label" :tableName="tabPaneList[5].tableName"></Pane>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane :label="tabPaneList[6].label" name="8">-->
<!--          <Pane :inputFrameDataId="inputFrameDataId" :outputFrameDataId="frame['outputFrameDataList'].length!==0?frame['outputFrameDataList'][parseInt(outputIndex)]['id']:0"-->
<!--                :list="effluent" :label="tabPaneList[6].label" :tableName="tabPaneList[6].tableName"></Pane>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane :label="tabPaneList[7].label" name="9">-->
<!--          <Pane :inputFrameDataId="inputFrameDataId" :outputFrameDataId="frame['outputFrameDataList'].length!==0?frame['outputFrameDataList'][parseInt(outputIndex)]['id']:0"-->
<!--                :list="solidWaste" :label="tabPaneList[7].label" :tableName="tabPaneList[7].tableName"></Pane>-->
<!--        </el-tab-pane>-->
<!--        <el-tab-pane :label="tabPaneList[9].label" name="10">-->
<!--          <Pane :inputFrameDataId="inputFrameDataId" :outputFrameDataId="frame['outputFrameDataList'].length!==0?frame['outputFrameDataList'][parseInt(outputIndex)]['id']:0"-->
<!--                :list="health" :label="tabPaneList[9].label" :tableName="tabPaneList[9].tableName"></Pane>-->
<!--        </el-tab-pane>-->
<!--      </el-tabs>-->
<!--    </el-main>-->
  </el-container>
</template>
<script>
// import api from 'api'
import Pane from './widgets/Pane'
import axios from "axios"
export default {
  name: 'SceneFrameData',
  components: {
    Pane
  },
  data () {
    return {
      activeName: '1',
      inputFrameDataId: 1,
      outputIndex: 0,
      outputFrameData: {
        inputFrameDataId: 1,
        collectionDescription: ''
      },
      sceneData: {},
      frame: {},
      tabPaneList: [
        {
          label: '工艺对象',
          name: '1',
          tableName: 'materialData'
        },
        {
          label: '能源',
          name: '2',
          tableName: 'energyData'
        },
        {
          label: '工艺参数',
          name: '3',
          tableName: 'keyParameterData'
        },
        {
          label: '设备',
          name: '4',
          tableName: 'deviceData'
        },
        {
          label: '空气污染',
          name: '6',
          tableName: 'envLoadData'
        },
        {
          label: '水污染',
          name: '7',
          tableName: 'envLoadData'
        },
        {
          label: '固废',
          name: '8',
          tableName: 'envLoadData'
        },
        {
          label: '辅料',
          name: '9',
          tableName: 'materialData'
        },
        {
          label: '职业健康',
          name: '10',
          tableName: 'envLoadData'
        }
      ],
      objectList: [],
      assistList: [],
      exhaustGas: [],
      effluent: [],
      solidWaste: [],
      health: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.frame = {}
      vm.inputFrameDataId = parseInt(to.params['inputFrameDataId'])
      if (to.params['sceneData'] !== undefined) {
        vm.sceneData = to.params['sceneData']
      }
      axios.get('http://localhost:9000/api/manage/inputFrameData/' + vm.inputFrameDataId).then(res => {
        vm.frame = res.data
        vm.sceneData = res.data['sceneData']
        let materials = res['materialDataList']
        materials.forEach(material => {
          if (material['materialDataCategoryId'] === 1) {
            vm.objectList.push(material)
          } else {
            vm.assistList.push(material)
          }
        })
        let envLoads = res['outputFrameDataList'][0]['envLoadDataList']
        envLoads.forEach(envLoad => {
          if (envLoad['envLoad']['envLoadCategoryId'] === 1) {
            vm.exhaustGas.push(envLoad)
          } else if (envLoad['envLoad']['envLoadCategoryId'] === 2) {
            vm.effluent.push(envLoad)
          } else if (envLoad['envLoad']['envLoadCategoryId'] === 3) {
            vm.solidWaste.push(envLoad)
          } else if (envLoad['envLoad']['envLoadCategoryId'] === 5) {
            vm.health.push(envLoad)
          }
        })
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.inputFrameDataId = to.params['inputFrameDataId']
    axios.get('http://localhost:9000/api/manage/inputFrameData/' + this.inputFrameDataId).then(res => {
      this.frame = res.data
    })
    next()
  },
  beforeRouteLeave (to, from, next) {
    this.objectList = []
    this.assistList = []
    this.exhaustGas = []
    this.effluent = []
    this.solidWaste = []
    this.health = []
    next()
  },
  methods: {
    goBack () {
      window.history.back()
    }
  }
}
</script>
<style scoped>
  .line{
    display : inline-block
  }
  .my-input{
    width:300px !important;
  }
  .right{
    float :right
  }
</style>
