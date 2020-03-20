<template>
  <el-container class="RuleIndex">
    <el-aside>
      <RuleTable :table="ruleList"></RuleTable>
    </el-aside>
    <el-main>
      <BaseTable :table="baseList" :ruleList="ruleList"></BaseTable>
    </el-main>
  </el-container>
</template>
<script>
import RuleTable from './widgets/RuleTable'
import BaseTable from './widgets/BaseTable'
export default {
  name: 'RuleIndex',
  components: {
    RuleTable,
    BaseTable
  },
  data () {
    return {
      url: this.$store.state.url,
      ruleList: [],
      baseList: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url + 'rules').then(res => {
        vm.ruleList = res.data
      })
      vm.$axios.get(vm.url + 'bases').then(res => {
        vm.baseList = res.data
      })
    })
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
  .RuleIndex{
    height: 100%;
    .el-aside{
      width: 500px!important;
      border-right: solid 1px #eee!important;
      padding: 0 1px!important;
    }
  }
</style>
