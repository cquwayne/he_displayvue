<template>
  <div>
    <el-row>
      <model-fbx v-if="!sceneVisible" src="static/models/fx0.fbx"></model-fbx>
      <model-fbx v-if="sceneVisible" src="static/models/fx1.fbx"></model-fbx>
    </el-row>
    <el-row>
      <el-select v-model="currentItem" placeholder="请选择" style="width: 500px">
        <el-option
          v-for="item in sceneDataList"
          :key="item.index"
          :label="item.title"
          :value="item.title"
        >
        </el-option>
      </el-select>
      <el-button type="success" @click="rawData">查看场景过程原始数据</el-button>
      <el-button type="primary" @click="featureProject">构建特征工程</el-button>
      <el-button type="primary" @click="featureProject">查看训练数据</el-button>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Process',
  data () {
    return {
      sceneVisible: false,
      currentItem: '',
      autoGenerateColumns: false,
      spread: null,
      excelData: [],
      fieldList: [],
      rawDataVisible: false,
      sceneDataList: []
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
        vm.sceneDataList = res['data']['data']
      })
    })
  },
  watch: {
    currentItem(){
      this.sceneVisible = !this.sceneVisible
    }
  },
  methods: {
    rawData() {
      this.$router.push({name: 'ExcelDisplay', params: {sceneDataTitle: this.currentItem}})
    },
    featureProject() {

    }
  }
}
</script>

<style scoped>
  .sample-tutorial {
    position: relative;
    height: 100%;
    overflow: hidden;
  }
  .sample-spreadsheets {
    width: 100%;
    height: 100%;
  }
</style>
