<template>
  <el-container class="TaskIndex">
    <el-aside>
      <TaskTable :table="taskList" :nodeList="nodeList" @handleSelect="handleSelect"></TaskTable>
    </el-aside>
    <el-main>
      <BindTable :table="bindList" :task="selectTask" :chainList="chainList"></BindTable>
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
      taskList: [],
      nodeList: [],
      selectTask: {},
      bindList: [],
      chainList: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url + 'tasks').then(res => {
        vm.taskList = res.data
      })
      vm.$axios.get(vm.url + 'nodes').then(res => {
        vm.nodeList = res.data
      })
      vm.$axios.get(vm.url + 'chains').then(res => {
        vm.chainList = res.data
      })
    })
  },
  methods: {
    handleSelect (task) {
      this.$axios.get(this.url + 'tasks/' + task.id).then(res => {
        let task = res.data
        this.selectTask = task
        this.bindList = task['bindList']
      })
    }
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
