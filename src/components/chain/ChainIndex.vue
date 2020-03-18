<template>
  <div class="ChainIndex">
    <div class="block">
      <ChainTable :table="chainList" @handleSelect="handleSelect"></ChainTable>
    </div>
    <div class="divider">
      <el-divider></el-divider>
    </div>
    <div class="block">
      <ChainGraph ref="chainGraph"></ChainGraph>
      <div class="divider">
        <el-divider></el-divider>
      </div>
      <ChainForm ref="chainForm"></ChainForm>
    </div>
  </div>
</template>
<script>
import ChainTable from './widgets/ChainTable'
import ChainForm from './widgets/ChainForm'
import ChainGraph from './widgets/ChainGraph'
export default {
  name: 'ChainIndex',
  components: {
    ChainTable,
    ChainForm,
    ChainGraph
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
  },
  methods: {
    handleSelect (chain) {
      this.$axios.get(this.url + 'chains/' + chain.id).then(res => {
        let chain = res.data
        this.$refs['chainGraph'].handleGraph(chain ? chain.ruleList : null, chain ? chain.linkList : null )
        this.$refs['chainForm'].updateForm(chain)
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .ChainIndex{
    height: 100%;
    display: flex;
    .ChainGraph{
      height: 50%;
    }
    .block{
      .divider{
        width: 100%;
        height: 1px;
      }
    }
  }
</style>
