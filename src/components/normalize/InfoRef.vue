<template>
  <el-container class="Information">
    <el-header>
      <SubNav :navList="navList"></SubNav>
    </el-header>
    <el-container>
      <el-main>
        <Table :element="'inforef'" :table="table" @handleSelect="handleSelect"></Table>
      </el-main>
      <el-aside>
        <Form :element="'inforef'" :form="select" ref="form"></Form>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import Table from './widgets/Table'
import Form from './widgets/Form'
import SubNav from '../widgets/SubNav'
export default {
  name: 'Information',
  components: {
    Table,
    Form,
    SubNav
  },
  data () {
    return {
      url: this.$store.state.url + 'normalize/inforefs',
      table: [],
      select: {},
      navList: [
        {
          name: 'Information',
          title: '工艺信息管理'
        },
        {
          name: 'InfoRef',
          title: '信息引用管理'
        },
        {
          name: 'AttrRef',
          title: '属性引用管理'
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