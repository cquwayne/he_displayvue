<template>
  <div class="RuleIndex">
    <div class="block">
      <RuleTable :table="ruleList" @handleSelect="handleSelect"></RuleTable>
    </div>
    <div class="divider">
      <el-divider></el-divider>
    </div>
    <div class="block">
      <RuleForm ref="ruleForm"></RuleForm>
    </div>
  </div>
</template>
<script>
import RuleForm from './widgets/RuleForm'
import RuleTable from './widgets/RuleTable'
export default {
  name: 'RuleIndex',
  components: {
    RuleTable,
    RuleForm
  },
  data () {
    return {
      url: this.$store.state.url,
      ruleList: [],
      selectRule: null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url + 'rules').then(res => {
        vm.ruleList = res.data
      })
    })
  },
  methods: {
    handleSelect (rule) {
      this.selectRule = rule
      this.$refs['ruleForm'].updateForm(rule)
    }
  }
}
</script>
<style scoped lang="scss">
  .RuleIndex{
    height: 100%;
    display: flex;
  }
</style>
