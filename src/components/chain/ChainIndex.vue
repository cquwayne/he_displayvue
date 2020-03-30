<template>
  <el-container class="ChainIndex">
    <el-aside>
      <ChainTable :table="chainList" @handleSelect="handleSelect"></ChainTable>
    </el-aside>
    <el-container>
      <el-main>
        <ChainGraph></ChainGraph>
      </el-main>
      <el-footer>
        <LinkTable :table="linkList" :chain="selectChain" :attributeList="attributeList"></LinkTable>
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import ChainTable from './widgets/ChainTable'
import LinkTable from './widgets/LinkTable'
import ChainGraph from './widgets/ChainGraph'
export default {
  name: 'ChainIndex',
  components: {
    ChainTable,
    LinkTable,
    ChainGraph
  },
  data () {
    return {
      url: this.$store.state.url,
      selectChain: {},
      chainList: [],
      attributeList: [],
      linkList: null
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url + 'chains').then(res => {
        vm.chainList = res.data
      })
      vm.$axios.get(vm.url + 'attributes').then(res => {
        vm.attributeList = res.data
      })
    })
  },
  methods: {
    handleSelect (chain) {
      this.$axios.get(this.url + 'chains/' + chain.id).then(res => {
        let chain = res.data
        this.selectChain = chain
        this.linkList = chain['linkList']
        // this.$refs['linkTable'].setTable(chain['linkList'])
      })
    }
  }
}
</script>
<style lang="scss">
  .ChainIndex{
    height: 100%!important;
    .ChainGraph{
      height: 50%;
    }
    .el-aside{
      width: 350px!important;
      border-right: solid 1px #eee!important;
      padding: 0 1px!important;
    }
    .el-footer{
      border-top: solid 1px #eee;
      height: 300px!important;
      max-height: 300px;
      overflow: auto;
    }
  }
</style>
