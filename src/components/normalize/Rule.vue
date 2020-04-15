<template>
  <el-container class="Rule">
    <el-header>
      <RuleNav></RuleNav>
    </el-header>
    <el-container>
      <el-main>
        <Table :element="'rule'" :table="table" @handleSelect="handleSelect"></Table>
      </el-main>
      <el-aside>
        <Form :element="'rule'" :form="select" ref="form"></Form>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import RuleNav from './widgets/RuleNav'
import Table from './widgets/Table'
import Form from './widgets/Form'
export default {
  name: 'Rule',
  components: {
    RuleNav,
    Table,
    Form
  },
  data () {
    return {
      url: this.$store.state.url + 'normalize/rules',
      table: [],
      select: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url).then(res => {
        vm.table = res.data
      })
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.$axios.get(this.url).then(res => {
      this.table = res.data
    })
    next()
  },
  methods: {
    handleSelect (item) {
      this.select = item
    }
  }
}
</script>
<style scoped lang="scss">
  
</style>