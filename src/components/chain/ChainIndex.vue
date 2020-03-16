<template>
  <div class="ChainIndex">
    <div class="block">
      <ChainTable :table="chainList"></ChainTable>
    </div>
    <div class="divider">
      <el-divider></el-divider>
    </div>
    <div class="block"></div>
  </div>
</template>
<script>
import ChainTable from './widgets/ChainTable'
export default {
  name: 'ChainIndex',
  components: {
    ChainTable
  },
  data () {
    return {
      url: this.$store.state.url,
      chainList: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url + 'chains').then(res => {
        vm.chainList = res.data
      })
    })
  }
}
</script>
<style scoped lang="scss">
  .ChainIndex{
    height: 100%;
    display: flex;
  }
</style>
