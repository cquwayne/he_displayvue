<template>
  <el-container class="Bind">
    <el-header>
      <ProNav></ProNav>
    </el-header>
    <el-container>
      <el-main>
        <Table :element="'bind'" :table="table" @handleSelect="handleSelect"></Table>
      </el-main>
      <el-aside>
        <Form :element="'bind'" :form="select" ref="form"></Form>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import ProNav from './widgets/ProNav'
import Table from './widgets/Table'
import Form from './widgets/Form'
export default {
  name: 'Bind',
  components: {
    ProNav,
    Table,
    Form
  },
  data () {
    return {
      url: this.$store.state.url + 'integration/binds',
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