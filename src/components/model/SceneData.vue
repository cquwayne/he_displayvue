<!--第二级页面-->
<template>
  <el-container class="SceneData" style="width: 2000px">
    <el-header>
      <el-divider></el-divider>
    </el-header>
    <el-main>
      <el-table :data="sceneData['inputFrameDataList']" stripe style="width: 100%">
        <el-table-column
          label="材料"
          width="200">
          <template slot-scope="scope">
            <div v-for="item in scope.row['materialDataList']" :key="item.index" class="text item">
              {{item['material']?item['material']['title']:''}} ： {{item['value']?item['value']:''}} {{item['unit']?item['unit']['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="能源"
          width="170">
          <template slot-scope="scope">
            <div v-for="item in scope.row['energyDataList']" :key="item.index" class="text item">
              {{item['energy']?item['energy']['title']:''}} ： {{item['value']?item['value']:''}} {{item['unit']?item['unit']['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="设备"
          width="140">
          <template slot-scope="scope">
            <div v-for="item in scope.row['deviceDataList']" :key="item.index" class="text item">
              {{item['device']?item['device']['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="工艺参数"
          width="210">
          <template slot-scope="scope">
            <div v-for="item in scope.row['keyParameterDataList']" :key="item.index" class="text item">
              {{item['title']?item['title']:''}} :  {{item['description']?item['description']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="工艺描述"
          width="200">
          <template slot-scope="scope">
            <div v-if="scope.row['outputFrameDataList']" v-for="item in scope.row['outputFrameDataList']" :key="item.index" class="text item">
              {{item['collectionDescription']?item['collectionDescription']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="环境负荷"
          width="200">
          <template slot-scope="scope">
            <div v-if="scope.row['outputFrameDataList']&&scope.row['outputFrameDataList'][0]['envLoadDataList']"
                 v-for="item in scope.row['outputFrameDataList'].length!==0?scope.row['outputFrameDataList'][0]['envLoadDataList']:null" :key="item.index" class="text item">
              {{item['envLoad']?item['envLoad']['title']:''}} ： {{item['value']}} {{item['unit']?item['unit']['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="90">
          <template slot-scope="scope">
              <el-button @click="handleDetail(scope.row)" slot="reference" size="mini">负荷数据</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
import axios from "axios"
import SceneBasic from './widgets/SceneBasic'
export default {
  name: 'SceneData',
  components: {
    SceneBasic
  },
  data () {
    return {
      sceneData: {},
      postInputFrameData: {
        sceneDataId: null,
        materialDataList: [],
        deviceDataList: [],
        keyParameterDataList: []
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      let sceneDataId = to.params['sceneDataId']
      vm.postInputFrameData.materialDataList = []
      vm.postInputFrameData.deviceDataList = []
      vm.postInputFrameData.keyParameterDataList = []

      axios.get('http://localhost:9000/api/manage/sceneData/' + sceneDataId).then(res => {
        vm.sceneData = res.data
        console.log(res)
        vm.postInputFrameData.sceneDataId = vm.sceneData['id']
        if (vm.sceneData['inputFrameDataList'].length !== 0) {
          vm.sceneData['inputFrameDataList'][0]['materialDataList'].forEach((item) => {
            vm.postInputFrameData.materialDataList.push(item['materialId'])
          })
          vm.sceneData['inputFrameDataList'][0]['deviceDataList'].forEach((item) => {
            vm.postInputFrameData.deviceDataList.push(item['deviceId'])
          })
          vm.sceneData['inputFrameDataList'][0]['keyParameterDataList'].forEach((item) => {
            vm.postInputFrameData.keyParameterDataList.push(item['title'])
          })
        }
      })
    })
  },
  methods: {
    handleDetail (row) {
      let params = {
        sceneDataId: row.sceneDataId,
        sceneData: this.sceneData,
        inputFrameDataId: row.id
      }
      console.log(params)
      this.$router.push({name: 'SceneFrameData', params: params})
    },
    goBack () {
      window.history.back()
    }
  }
}
</script>
<style scoped>

</style>
