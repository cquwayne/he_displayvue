<template>
  <el-container class="Running">
    <el-aside>
      <RunTable :table="instanceList"></RunTable>
    </el-aside>
    <el-container>
      <el-main></el-main>
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>
<script>
import RunTable from './widgets/RunTable'
export default {
  name: 'Running',
  components: {
    RunTable
  },
  data () {
    return {
      url: this.$store.state.url,
      instanceList: [],
      selectInstance: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url + 'instances').then(res => {
        vm.instanceList = res.data
      })
    })
  },
}
</script>
<style scoped lang="scss">
  .Running{
    height: 100%;
    .el-aside{
      width: 220px!important;
      border-right: solid 1px #eee!important;
      padding: 0 1px!important;
    }
  }
</style>
