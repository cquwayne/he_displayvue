<template>
  <el-container class="Model">
    <el-aside style="width: 400px!important;">
      <el-card>
        <NodeTable class="table" :table="totalNodeTable" @handleSelect="handleSelect"></NodeTable>
      </el-card>
    </el-aside>
    <el-main>
      <Graph ref="graph"></Graph>
      <el-divider></el-divider>
      <el-row>
        <el-col :span="20">
          <PipeForm :nodeList="currentNodeList"></PipeForm>
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
      <el-card class="pane" v-if="currentNodeList">
        <NodeTable class="table" :editable="true" :table="currentNodeList"></NodeTable>
      </el-card>
      <el-card class="pane" v-if="currentPipeList">
        <PipeTable class="table" :table="currentPipeList" :nodeList="currentNodeList"></PipeTable>
      </el-card>
    </el-drawer>  
  </el-container>
</template>
<script>
import NodeTable from './widgets/NodeTable'
import Graph from './widgets/Graph'
import PipeTable from './widgets/PipeTable'
import PipeForm from './widgets/PipeForm'
export default {
  name: 'Model',
  components: {
    Graph,
    NodeTable,
    PipeTable,
    PipeForm
  },
  data () {
    return {
      drawer: false,
      url: 'http://localhost:8000/api/nodes/',
      currentPipeList: null,
      currentNodeList: null,
      totalNodeTable: [],
      graphMap: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.handleSelect({id: to.query['id']})
      vm.$axios.get(vm.url).then(res => {
        vm.totalNodeTable = res.data
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
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
      this.currentNodeList = []
      this.currentPipeList = []
      for (let key in this.graphMap) {
        let graph = this.graphMap[key]
        if (graph.nodeList !== undefined && graph.nodeList.length !== 0) {
          graph.nodeList.forEach(item => {
            this.currentNodeList.push(item)
          })
        }
        if (graph.pipeList !== undefined && graph.pipeList.length !== 0) {
          graph.pipeList.forEach(item => {
            this.currentPipeList.push(item)
          })
        }
      }
      this.$refs['graph'].handleGraph(this.currentNodeList, this.currentPipeList)
    }
  }
}
</script>
<style lang="scss">
  .Model{
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
