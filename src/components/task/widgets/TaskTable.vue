<template>
  <div class="TaskTable">
    <el-table
      :data="table"
      style="width:100%">
      <el-table-column
        label="任务名称">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="关联模型">
        <template slot-scope="scope">
          {{ scope.row.node.title }}
        </template>
      </el-table-column>
      <el-table-column
        label="关联规则">
        <template slot-scope="scope">
          {{ scope.row.bindList.length > 0 ? scope.row.bindList.length + 1 : 0 }} 条
        </template>
      </el-table-column>
      <el-table-column width="150px">
        <template slot="header">
          <el-button  type="primary" size="mini" @click.native="handleAdd">
            新建任务
          </el-button>
        </template>
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain
            @click="handleSelect(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" plain
            @click="handleSelect(scope.$index, scope.row)">采集</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'TaskTable',
  props: {
    table: {
      type: Array
    }
  },
  methods: {
    handleAdd () {
      this.$emit('handleSelect', null)
    },
    handleSelect (index, row) {
      this.$emit('handleSelect', row)
    }
  }
}
</script>
<style scoped lang="scss">

</style>
