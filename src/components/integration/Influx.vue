<template>
  <el-container class="Influx">
    <el-header>
      <el-row>
        <el-col :span="6">
          <el-select v-model="query.processId" filterable placeholder="请选择">
            <el-option
              v-for="item in processList" :key="item.index"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handleQuery">
            查询
          </el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-divider></el-divider>
      <el-table
        :data="table"
        style="width:100%">
        <el-table-column label="时间">
          <template slot-scope="scope">
            {{ scope.row.time }}
          </template>
        </el-table-column>
        <el-table-column label="关联工艺过程">
          <template slot-scope="scope">
            {{ scope.row.processId }}
          </template>
        </el-table-column>
        <el-table-column label="关联模型坐标">
          <template slot-scope="scope">
            {{ scope.row.pointId }}
          </template>
        </el-table-column>
        <el-table-column label="关联工艺信息">
          <template slot-scope="scope">
            {{ scope.row.informationId }}
          </template>
        </el-table-column>
        <el-table-column label="关联工艺属性">
          <template slot-scope="scope">
            {{ scope.row.attributeId }}
          </template>
        </el-table-column>
        <el-table-column label="数据值">
          <template slot-scope="scope">
            {{ scope.row.value }}
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>
export default {
  name: 'Influx',
  data () {
    return {
      url: this.$store.state.url,
      processList: [],
      query: {
        processId: null
      },
      table: []
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$axios.get(vm.url + 'integration/processs').then(res => {
        vm.processList = res.data
      })
    })
  },
  methods: {
    handleQuery () {
      this.$axios.get(this.url + 'data', this.query).then(res => {
        this.table = res.data
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .Influx{
    .el-header{
      padding: 20px!important;
    }
  }
</style>