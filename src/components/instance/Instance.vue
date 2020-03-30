<template>
  <el-container class="Instance">
    <el-aside>
      <PointTable :table="pointList" @handleSelect="handleSelect"></PointTable>
    </el-aside>
    <el-container>
      <el-main>
        <ModelGraph ref="graph"></ModelGraph>
      </el-main>
      <el-footer>
        <AttributeTable :table="attributeList"></AttributeTable>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import ModelGraph from '../model/widgets/ModelGraph'
import AttributeTable from './widgets/AttributeTable'
import PointTable from './widgets/PointTable'
export default {
  name: 'Instance',
  components: {
    AttributeTable,
    ModelGraph,
    PointTable
  },
  data () {
    return {
      id: null,
      instance: {},
      url: this.$store.state.url,
      pointList: [],
      graph: {},
      attributeList: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.id = to.query['id'] ? to.query['id'] : 2
      vm.$axios.get(vm.url + 'instances/' + vm.id).then(res => {
        vm.instance = res.data
        vm.pointList = vm.instance['node']['pointList']
        vm.$axios.get(vm.url + 'nodes/' + vm.instance.nodeId + '/graph').then(res => {
          vm.graph = res.data
          vm.$refs['graph'].handleGraph(vm.graph.pointList, vm.graph.pipeList)
        })
      })
    })
  },
  methods: {
    handleSelect (point) {
      this.attributeList = point.attributeList
    }
  }
}
</script>
<style scoped lang="scss">
  .Instance{
    height: 100%;
    .el-aside{
      width: 400px!important;
      border-right: solid 1px #eee!important;
      padding: 0 1px!important;
    }
    .el-footer{
      border-top: solid 1px #eee;
      height: 50%!important;
      max-height: 50%!important;
      overflow: auto;
    }
  }
</style>
