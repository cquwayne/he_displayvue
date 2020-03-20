<template>
  <el-container class="Running">
    <el-aside>
      <RunTable :table="taskList"></RunTable>
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
      taskList: [],
      selectTask: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url + 'tasks').then(res => {
        vm.taskList = res.data
      })
    })
  },
}
</script>
<style scoped lang="scss">
  .Running{
    height: 100%;
    .el-aside{
      width: 300px!important;
      border-right: solid 1px #eee!important;
      padding: 0 1px!important;
    }
  }
</style>
