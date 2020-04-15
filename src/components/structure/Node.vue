<template>
  <el-container class="Element">
    <el-main>
      <Table :table="table" @handleSelect="handleSelect"></Table>
    </el-main>
    <el-aside>
      <Form :form="select" ref="form"></Form>
    </el-aside>
  </el-container>
</template>
<script>
import Table from './widgets/Table'
import Form from './widgets/Form'
export default {
  name: 'Node',
  components: {
    Table,
    Form
  },
  data () {
    return {
      url: this.$store.state.url + 'structure/nodes',
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
<style scoped>
  .Element{
  }
</style>