<template>
  <el-container class="TaskIndex">
    <el-aside>
      <TaskTable :table="taskList"></TaskTable>
    </el-aside>
    <el-main>
      <BindTable></BindTable>
    </el-main>
  </el-container>
</template>
<script>
import TaskTable from './widgets/TaskTable'
import BindTable from './widgets/BindTable'
export default {
  name: 'TaskIndex',
  components: {
    TaskTable,
    BindTable
  },
  data () {
    return {
      url: this.$store.state.url,
      taskList: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url + 'tasks').then(res => {
        vm.taskList = res.data
      })
    })
  }
}
</script>
<style scoped lang="scss">
  .TaskIndex{
    height: 100%;
    .el-aside{
      width: 500px!important;
      border-right: solid 1px #eee!important;
      padding: 0 1px!important;
    }
  }
</style>
