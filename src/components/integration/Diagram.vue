<template>
  <el-container class="Diagram">
    <el-header>
      <ProNav></ProNav>
    </el-header>
    <el-container id="content">
      <el-aside>
        <div v-for="item in table" :key="item.index">
          <el-button size="mini" type="primary" plain
            @click="handleSelect(item)">
            {{ item.title}}
          </el-button>
        </div>
      </el-aside>
      <el-main>
        <Graph ref="graph"></Graph>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import ProNav from './widgets/ProNav'
import Table from './widgets/Table'
import Form from './widgets/Form'
import Graph from '../widgets/Graph'
export default {
  name: 'Process',
  components: {
    ProNav,
    Table,
    Form,
    Graph
  },
  data () {
    return {
      url: this.$store.state.url + 'integration/processs',
      table: [],
      select: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url).then(res => {
        vm.table = res.data
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.$axios.get(this.url).then(res => {
      this.table = res.data
    })
    next()
  },
  methods: {
    handleSelect (item) {
      this.$axios.get(this.url + '/' + item.nodeId + '/graph').then(res => {
        let newGraph = res.data
        this.$refs['graph'].handleGraph(newGraph.pointList, newGraph.pipeList)
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .Diagram {
    height: 100%;
    #content{
      height: calc(100% - 60px);
      .el-aside, .el-main{
        height: 100%;
      }
      .el-aside{
        width: 151px!important;
        border-right: solid 1px #eee;
      }
    }
  }
</style>