<template>
  <el-container class="RuleIndex">
    <el-aside>
      <RuleTable :table="ruleList"></RuleTable>
    </el-aside>
    <el-main>
      <AttributeTable :table="attributeList" :ruleList="ruleList"></AttributeTable>
    </el-main>
  </el-container>
</template>
<script>
import RuleTable from './widgets/RuleTable'
import AttributeTable from './widgets/AttributeTable'
export default {
  name: 'RuleIndex',
  components: {
    RuleTable,
    AttributeTable
  },
  data () {
    return {
      url: this.$store.state.url,
      ruleList: [],
      attributeList: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url + 'rules').then(res => {
        vm.ruleList = res.data
      })
      vm.$axios.get(vm.url + 'attributes').then(res => {
        vm.attributeList = res.data
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
