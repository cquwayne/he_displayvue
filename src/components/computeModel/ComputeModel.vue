<template>
  <div>
    <el-row>
      <model-fbx v-if="!inputVisible" src="static/models/fx0.fbx"></model-fbx>
      <model-fbx v-if="inputVisible" src="static/models/fx1.fbx"></model-fbx>
    </el-row>
    <el-row>
      <el-select v-model="currentItem" placeholder="请选择" style="width: 500px">
        <el-option
          v-for="item in sceneDataList"
          :key="item.index"
          :label="item.title"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-button type="success" @click="feature">生成计算模型</el-button>
      <el-button type="info" :disabled="featureVisible" @click="featureDisplay">模型特征</el-button>
      <el-button type="primary" :disabled="featureVisible" @click="featureCompute">负荷计算</el-button>
      <el-dialog :title="explain" :visible.sync="featureImportance" style="width: 1500px;height: 2000px">
        <el-image
          fit="fill"
          :src="url"
        >
        </el-image>
        <el-button type="info" @click="transfer">下一张</el-button>
      </el-dialog>
      <el-table :data="currentItemList" style="width: 100%">
        <el-table-column
          label="材料"
          width="200"
          align="center">
          <template slot-scope="scope">
            <div v-for="item in scope.row['materialDataList']" :key="item.index" class="text item">
              {{item['material']?item['material']['title']:''}} ： {{item['value']?item['value']:''}} {{item['unit']?item['unit']['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="能源"
          width="170"
          align="center">
          <template slot-scope="scope">
            <div v-for="item in scope.row['energyDataList']" :key="item.index" class="text item">
              {{item['energy']?item['energy']['title']:''}} ： {{item['value']?item['value']:''}} {{item['unit']?item['unit']['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="设备"
          width="140"
          align="center">
          <template slot-scope="scope">
            <div v-for="item in scope.row['deviceDataList']" :key="item.index" class="text item">
              {{item['device']?item['device']['title']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="工艺参数"
          width="210"
          align="center">
          <template slot-scope="scope">
            <div v-for="item in scope.row['keyParameterDataList']" :key="item.index" class="text item">
              {{item['title']?item['title']:''}} :  {{item['description']?item['description']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="工艺描述"
          width="200"
          align="center">
          <template slot-scope="scope">
            <div v-if="scope.row['outputFrameDataList']" v-for="item in scope.row['outputFrameDataList']" :key="item.index" class="text item">
              {{item['collectionDescription']?item['collectionDescription']:''}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="环境负荷"
          width="200"
          align="center">
          <template slot-scope="scope">
            <div v-if="scope.row['outputFrameDataList']&&scope.row['outputFrameDataList'][0]['envLoadDataList']"
                 v-for="item in scope.row['outputFrameDataList'].length!==0?scope.row['outputFrameDataList'][0]['envLoadDataList']:null" :key="item.index" class="text item">
              {{item['envLoad']?item['envLoad']['title']:''}} ： {{item['value']}} {{item['unit']?item['unit']['title']:''}}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-dialog
      title="规划信息输入"
      :visible.sync="featureInput"
      style="top: 10%"
    >
      <el-form :inline="true" label-width="100px">
        <el-form-item label="预热温度">
          <el-input v-model="form.f1" style="width: auto"></el-input> ℃
        </el-form-item>
        <el-form-item label="预热时间">
          <el-input v-model="form.f2" style="width: auto"></el-input> min
        </el-form-item>
        <el-form-item label="风量">
          <el-input v-model="form.f3" style="width: auto"></el-input> VA
        </el-form-item>
        <el-form-item label="熔炼温度">
          <el-input v-model="form.f4" style="width: auto"></el-input> ℃
        </el-form-item>
        <el-form-item label="扒渣次数">
          <el-input v-model="form.f5" style="width: auto"></el-input> 次
        </el-form-item>
        <el-form-item label="加料次数">
          <el-input v-model="form.f6" style="width: auto"></el-input> 次
        </el-form-item>
        <el-form-item label="机械加工余量">
          <el-input v-model="form.f7" style="width: auto"></el-input> mm
        </el-form-item>
        <el-form-item label="炉体容积">
          <el-input v-model="form.f8" style="width: auto"></el-input> t
        </el-form-item>
        <el-form-item>
          <el-tag style="margin-left: 57px">粉尘预测值:68.31g</el-tag>
          <el-button @click="displayFactors" size="small" style="margin-left: 57px"  type="primary" plain>特征影响作用分析</el-button>
          <el-button style="margin-left: 255px" type="primary">计算</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="结果解释"
      :visible.sync="valueComponent"
      style="top: 10%"
    >
      <el-image
        fit="fill"
        :src="featureUrl"
      >
      </el-image>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'
// import api from 'api'
export default {
  name: 'Process',
  data () {
    return {
      loading: true,
      refresh: true,
      currentItem: {},
      dialogVisible: false,
      changeScene: false,
      inputVisible: false,
      sceneDataList: [],
      currentItemList:[],
      featureVisible: true,
      featureImportance: false,
      valueComponent: false,
      url: require('C:/Users/76133/Desktop/data/1.png'),
      featureUrl: require('C:/Users/76133/Desktop/data/3.png'),
      explain: '模型特征重要度排序',
      featureInput: false,
      form: {
        f1: '550',
        f2: '61',
        f3: '69',
        f4: '1346',
        f5: '2',
        f6: '2',
        f7: '3',
        f8: '2'
      }
    }
  },
  watch: {
    currentItem (newValue, oldValue) {
      this.inputVisible = true
      this.currentItemList = []
      this.currentItemList.push(this.currentItem['inputFrameDataList'][0])
      // this.refreshWindows()
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let params = {
        categoryId: 5,
        currentPage: 1,
        pageSize: 10
      }
      axios.get('http://localhost:9000/api/category', {params: params}).then(res => {
        // vm.sceneDataList = res['data']['data']
        vm.sceneDataList.push(res['data']['data'][0])
      })
    })
  },
  methods: {

    feature() {
      this.featureVisible = false
    },
    featureDisplay() {
      this.featureImportance = true;
    },
    transfer() {
      this.url= require('C:/Users/76133/Desktop/data/2.png')
      this.explain = '特征正负影响作用'
    },
    featureCompute(){
      this.featureInput = true
    },
    displayFactors(){
      this.valueComponent=true
    }
  }
}
</script>

<style scoped>

</style>
