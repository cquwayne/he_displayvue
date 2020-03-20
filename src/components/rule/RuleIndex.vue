<template>
  <div class="RuleIndex">
    <div class="block">
      <RuleTable :table="ruleList"></RuleTable>
    </div>
    <div class="divider">
      <el-divider></el-divider>
    </div>
    <div class="block">
      <BaseTable :table="baseList" :ruleList="ruleList"></BaseTable>
    </div>
  </div>
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
    max-height: 100%;
    overflow: auto;
    display: flex;
  }
</style>
