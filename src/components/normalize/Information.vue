<template>
  <el-container class="Information">
    <el-header>
      <InfoNav></InfoNav>
    </el-header>
    <el-container>
      <el-main>
        <Table :element="'information'" :table="table" @handleSelect="handleSelect"></Table>
      </el-main>
      <el-aside>
        <Form :element="'information'" :form="select" ref="form"></Form>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import Table from './widgets/Table'
import Form from './widgets/Form'
import InfoNav from './widgets/InfoNav'
export default {
  name: 'Information',
  components: {
    Table,
    Form,
    InfoNav
  },
  data () {
    return {
      url: this.$store.state.url + 'normalize/informations',
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