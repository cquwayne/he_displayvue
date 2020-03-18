<template>
  <el-container class="ModelIndex">
    <el-aside style="width: 400px!important;">
      <NodeTable class="table" :table="totalNodeTable" @handleSelect="handleSelect"></NodeTable>
    </el-aside>
    <el-main>
      <ModelGraph ref="graph"></ModelGraph>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="20">
          <PipeForm :pointList="currentPointList" :pipeList="currentPipeList" :nodeId="id"></PipeForm>
        </el-col>
        <el-col :span="4">
          <el-button @click="drawer=true">编辑</el-button>
        </el-col>
      </el-row>
    </el-main>
    <el-drawer
      title="编辑"
      :with-header="false"
      :visible.sync="drawer"
      :size="'50%'"
      :direction="'rtl'">
      <el-card class="pane" v-if="currentPointList">
        <NodeTable class="table" :editable="true" :table="currentPointList"></NodeTable>
      </el-card>
      <el-card class="pane" v-if="currentPipeList">
        <PipeTable class="table" :table="currentPipeList" :pointList="currentPointList"></PipeTable>
      </el-card>
    </el-drawer>
  </el-container>
</template>
<script>
import Header from '../widgets/Header'
import NodeTable from './widgets/NodeTable'
import ModelGraph from './widgets/ModelGraph'
import PipeTable from './widgets/PipeTable'
import PipeForm from './widgets/PipeForm'
export default {
  name: 'ModelIndex',
  components: {
    Header,
    ModelGraph,
    NodeTable,
    PipeTable,
    PipeForm
  },
  data () {
    return {
      header: {
        title: '模型构建'
      },
      drawer: false,
      id: null,
      url: 'http://localhost:8000/api/nodes/',
      currentPipeList: null,
      currentPointList: null,
      totalNodeTable: [],
      graphMap: {}
    }
  },
  watch: {
    '$route' (to, from) {
      this.$router.go(0)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.id = to.query['id']
      vm.handleSelect({id: to.query['id']})
      vm.$axios.get(vm.url).then(res => {
        vm.totalNodeTable = res.data
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.id = to.query['id']
    this.handleSelect({id: to.query['id']})
    this.$axios.get(this.url).then(res => {
      this.totalNodeTable = res.data
    })
    next()
  },
  methods: {
    handleSelect (node) {
      this.$axios.get(this.url + node.id + '/graph').then(res => {
        let newGraph = res.data
        this.graphMap[newGraph.root.id] = newGraph
        this.handleGraphMap()
      })
    },
    handleGraphMap () {
      this.currentPointList = []
      this.currentPipeList = []
      for (let key in this.graphMap) {
        let graph = this.graphMap[key]
        if (graph.pointList !== undefined && graph.pointList.length !== 0) {
          graph.pointList.forEach(item => {
            this.currentPointList.push(item)
          })
        }
        if (graph.pipeList !== undefined && graph.pipeList.length !== 0) {
          graph.pipeList.forEach(item => {
            this.currentPipeList.push(item)
          })
        }
      }
      this.$refs['graph'].handleGraph(this.currentPointList, this.currentPipeList)
    }
  }
}
</script>
<style lang="scss">
  .ModelIndex{
    height: 100%;
    .el-aside{
      .el-card{
        margin: 10px;
      }
    }
    .el-drawer{
      .el-card{
        margin: 10px;
      }
      height: 100%!important;
      max-height: 100%!important;
      overflow: auto;
    }
  }
</style>
