<template>
  <el-container class="Process">
    <el-header>
      <ProNav></ProNav>
    </el-header>
    <el-container>
      <el-main>
        <Table :element="'process'" :table="table" @handleSelect="handleSelect"></Table>
      </el-main>
      <el-aside>
        <Form :element="'process'" :form="select" ref="form"></Form>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import ProNav from './widgets/ProNav'
import Table from './widgets/Table'
import Form from './widgets/Form'
export default {
  name: 'Process',
  components: {
    ProNav,
    Table,
    Form
  },
  data () {
    return {
      url: this.$store.state.url + 'integration/processs',
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