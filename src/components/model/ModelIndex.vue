<template>
  <div class="ModelIndex">
    <el-container>
      <el-aside>
        <el-table
          :data="nodeTable"
          style="width: 300px">
          <el-table-column
            label="ID">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column
            label="Label">
            <template slot-scope="scope">
              {{ scope.row.label }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleGraph(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="20" v-if="selectNode.label">
            {{selectNode ? selectNode.label : ''}}
          </el-col>
          <el-col :span="4" v-if="selectNode.id">
            <router-link :to="{name: 'ModelDetail', params: {id: selectNode ? selectNode.id : 0}}">详情</router-link>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <Graph ref="graph" :id="selectNode.id"></Graph>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Graph from './widgets/Graph'
export default {
  name: 'ModelIndex',
  components: {
    Graph
  },
  data () {
    return {
      url: 'http://localhost:8000/api/nodes/',
      selectNode: {
        id: null,
        label: null
      },
      nodeTable: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url).then(res => {
        vm.nodeTable = res.data
      })
    })
  },
  methods: {
    handleGraph (index, row) {
      this.selectNode = row
      // this.$refs['graph'].search()
    }
  }
}
</script>
<style lang="scss">
  .ModelIndex{
    height: 100%;
    .el-container{
      height: 100%;
    }
    .el-aside{
      max-height: 100%;
      width: fit-content!important;
    }
    .el-main{
      padding: 0 20px!important;
    }
  }
</style>
