<template>
  <div class="TaskIndex">
    <div class="block">
      <TaskTable :table="taskList"></TaskTable>
    </div>
    <di class="divider">
      <el-divider></el-divider>
    </di>
    <div class="block">
    </div>
  </div>
</template>
<script>
import TaskTable from './widgets/TaskTable'
export default {
  name: 'TaskIndex',
  components: {
    TaskTable
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
    display: flex;
  }
</style>
