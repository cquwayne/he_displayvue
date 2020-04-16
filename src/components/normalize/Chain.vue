<template>
  <el-container class="Chain">
    <el-header>
      <SubNav :navList="navList"></SubNav>
    </el-header>
    <el-container>
      <el-main>
        <Table :element="'chain'" :table="table" @handleSelect="handleSelect"></Table>
      </el-main>
      <el-aside>
        <Form :element="'chain'" :form="select" ref="form"></Form>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import SubNav from '../widgets/SubNav'
import Table from './widgets/Table'
import Form from './widgets/Form'
export default {
  name: 'Chain',
  components: {
    SubNav,
    Table,
    Form
  },
  data () {
    return {
      url: this.$store.state.url + 'normalize/chains',
      table: [],
      select: {},
      navList: [
        {
          name: 'Attribute',
          title: '属性管理'
        },
        {
          name: 'Chain',
          title: '规则链管理'
        }
      ]
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