<template>
  <el-container class="InstanceIndex">
    <el-aside>
      <InstanceTable :table="instanceList" :nodeList="nodeList" @handleSelect="handleSelect"></InstanceTable>
    </el-aside>
    <el-main>
      <BindTable :table="bindList" :instance="selectInstance" :nodeList="nodeList" :chainList="chainList"></BindTable>
    </el-main>
  </el-container>
</template>
<script>
import InstanceTable from './widgets/InstanceTable'
import BindTable from './widgets/BindTable'
export default {
  name: 'InstanceIndex',
  components: {
    InstanceTable,
    BindTable
  },
  data () {
    return {
      url: this.$store.state.url,
      instanceList: [],
      nodeList: [],
      selectInstance: {id: 0},
      bindList: [],
      chainList: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url + 'instances').then(res => {
        vm.instanceList = res.data
      })
      vm.$axios.get(vm.url + 'chains').then(res => {
        vm.chainList = res.data
      })
    })
  },
  methods: {
    handleSelect (instance) {
      this.$axios.get(this.url + 'instances/' + instance.id).then(res => {
        let instance = res.data
        this.selectInstance = instance
        this.bindList = instance['bindList']
      })
      this.$axios.get(this.url + 'nodes/' + instance.node.id).then(res => {
        let node = res.data
        this.nodeList = node['nodeList']
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .InstanceIndex{
    height: 100%;
    .el-aside{
      width: 500px!important;
      border-right: solid 1px #eee!important;
      padding: 0 1px!important;
    }
  }
</style>
